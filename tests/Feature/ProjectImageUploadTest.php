<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectImageUploadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
    }

    private function payload(array $extra = []): array
    {
        return array_merge([
            'title' => 'P&ID Crude Distillation',
            'category' => 'Piping Engineering',
            'description' => 'Deskripsi proyek.',
        ], $extra);
    }

    public function test_admin_dapat_mengunggah_gambar_proyek(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/admin/projects', $this->payload([
                'image' => UploadedFile::fake()->image('render.jpg', 1200, 900),
            ]))
            ->assertRedirect();

        $project = Project::first();
        $this->assertNotNull($project->image_path);
        Storage::disk('local')->assertExists($project->image_path);
        $this->assertStringContainsString('/projects/'.$project->id.'/image', $project->image_src);
    }

    public function test_gambar_proyek_bisa_diakses_dan_diunduh(): void
    {
        Storage::disk('local')->put('projects/render.jpg', UploadedFile::fake()->image('render.jpg')->getContent());
        $project = Project::create([
            'title' => 'Crane Hook FEA',
            'category' => 'Analysis & Simulation',
            'description' => 'x',
            'image_path' => 'projects/render.jpg',
        ]);

        $this->get('/projects/'.$project->id.'/image')->assertOk()->assertHeader('Content-Type', 'image/jpeg');
        $this->get('/projects/'.$project->id.'/image/download')->assertOk()->assertDownload();
    }

    public function test_gambar_proyek_bisa_diganti_dan_dihapus(): void
    {
        $user = User::factory()->create();
        Storage::disk('local')->put('projects/lama.jpg', UploadedFile::fake()->image('lama.jpg')->getContent());
        $project = Project::create([
            'title' => 'Heat Exchanger',
            'category' => 'Piping Engineering',
            'description' => 'x',
            'image_path' => 'projects/lama.jpg',
        ]);

        $this->actingAs($user)
            ->post('/admin/projects/'.$project->id, $this->payload([
                '_method' => 'put',
                'image' => UploadedFile::fake()->image('baru.jpg', 800, 600),
            ]))
            ->assertRedirect();

        $project->refresh();
        $this->assertNotSame('projects/lama.jpg', $project->image_path);
        Storage::disk('local')->assertMissing('projects/lama.jpg');

        $this->actingAs($user)
            ->post('/admin/projects/'.$project->id, $this->payload([
                '_method' => 'put',
                'remove_image' => true,
            ]))
            ->assertRedirect();

        $project->refresh();
        $this->assertNull($project->image_path);
    }

    public function test_gambar_proyek_wajib_berupa_file_gambar(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/admin/projects', $this->payload([
                'image' => UploadedFile::fake()->create('dokumen.pdf', 100, 'application/pdf'),
            ]))
            ->assertSessionHasErrors('image');

        $this->assertNull(Project::first()?->image_path);
    }
}
