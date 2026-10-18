<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AvatarUploadTest extends TestCase
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
            'full_name' => 'Achmad Daffa',
            'headline' => 'Mechanical Engineering Student',
            'bio_summary' => 'Bio',
            'university' => 'UGM',
            'study_program' => 'D4',
            'semester' => 'Semester 5',
            'focus_area' => 'Piping',
            'internship_seeking' => 'Oil & Gas',
            'email' => 'a@b.c',
            'location' => 'Karanganyar',
        ], $extra);
    }

    public function test_admin_dapat_mengunggah_foto_profil(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/admin/profile-setting', $this->payload([
                'avatar' => UploadedFile::fake()->image('foto.jpg', 600, 800),
            ]))
            ->assertRedirect();

        $profile = Profile::first();
        $this->assertNotNull($profile->avatar_path);
        Storage::disk('local')->assertExists($profile->avatar_path);
        $this->assertStringContainsString('/avatar', $profile->avatar_src);
        $this->assertStringContainsString('/avatar/download', $profile->avatar_download_url);
    }

    public function test_foto_profil_bisa_diakses_dan_diunduh(): void
    {
        Storage::disk('local')->put('avatars/foto.jpg', UploadedFile::fake()->image('foto.jpg')->getContent());
        Profile::create([
            'id' => 1,
            'full_name' => 'Achmad Daffa',
            'headline' => 'x',
            'email' => 'a@b.c',
            'avatar_path' => 'avatars/foto.jpg',
        ]);

        $this->get('/avatar')->assertOk()->assertHeader('Content-Type', 'image/jpeg');
        $this->get('/avatar/download')->assertOk()->assertDownload();
    }

    public function test_foto_profil_bisa_dihapus(): void
    {
        $user = User::factory()->create();
        Storage::disk('local')->put('avatars/foto.jpg', UploadedFile::fake()->image('foto.jpg')->getContent());
        Profile::create([
            'id' => 1,
            'full_name' => 'Achmad Daffa',
            'headline' => 'x',
            'email' => 'a@b.c',
            'avatar_path' => 'avatars/foto.jpg',
        ]);

        $this->actingAs($user)
            ->post('/admin/profile-setting', $this->payload(['remove_avatar' => true]))
            ->assertRedirect();

        $this->assertNull(Profile::first()->avatar_path);
        Storage::disk('local')->assertMissing('avatars/foto.jpg');
    }
}
