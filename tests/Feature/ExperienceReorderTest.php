<?php

namespace Tests\Feature;

use App\Models\Experience;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExperienceReorderTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['email' => 'admin@daffa.eng']);
    }

    private function makeExp(string $title, string $period, int $sortOrder): Experience
    {
        return Experience::create([
            'title' => $title,
            'organization' => 'UGM',
            'type' => 'education',
            'period' => $period,
            'sort_order' => $sortOrder,
        ]);
    }

    public function test_reorder_saves_new_order(): void
    {
        $a = $this->makeExp('A', 'Aug 2024 - Aug 2028', 1);
        $b = $this->makeExp('B', 'Apr 2025 - Jun 2025', 2);
        $c = $this->makeExp('C', 'Jan 2025 - Apr 2025', 3);

        $this->actingAs($this->admin())
            ->post('/admin/experiences/reorder', ['ids' => [$c->id, $a->id, $b->id]])
            ->assertSessionHasNoErrors();

        $this->assertSame(1, $c->fresh()->sort_order);
        $this->assertSame(2, $a->fresh()->sort_order);
        $this->assertSame(3, $b->fresh()->sort_order);

        $this->assertSame(
            ['C', 'A', 'B'],
            Experience::orderBy('sort_order')->pluck('title')->all()
        );
    }

    public function test_sort_by_period_asc_oldest_first(): void
    {
        $this->makeExp('Baru', 'Apr 2025 - Jun 2025', 1);
        $this->makeExp('Lama', 'Aug 2024 - Aug 2028', 2);
        $this->makeExp('Tengah', 'Jan 2025 - Apr 2025', 3);

        $this->actingAs($this->admin())
            ->post('/admin/experiences/sort-by-period', ['direction' => 'asc'])
            ->assertSessionHasNoErrors();

        $this->assertSame(
            ['Lama', 'Tengah', 'Baru'],
            Experience::orderBy('sort_order')->pluck('title')->all()
        );
    }

    public function test_sort_by_period_desc_newest_first(): void
    {
        $this->makeExp('Lama', 'Aug 2024 - Aug 2028', 1);
        $this->makeExp('Baru', 'Apr 2025 - Jun 2025', 2);
        $this->makeExp('Tengah', 'Jan 2025 - Apr 2025', 3);

        $this->actingAs($this->admin())
            ->post('/admin/experiences/sort-by-period', ['direction' => 'desc'])
            ->assertSessionHasNoErrors();

        $this->assertSame(
            ['Baru', 'Tengah', 'Lama'],
            Experience::orderBy('sort_order')->pluck('title')->all()
        );
    }

    public function test_reorder_rejects_unknown_id(): void
    {
        $this->makeExp('A', 'Aug 2024 - Aug 2028', 1);

        $this->actingAs($this->admin())
            ->post('/admin/experiences/reorder', ['ids' => [999]])
            ->assertSessionHasErrors('ids.0');
    }
}
