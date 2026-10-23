<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::orderBy('sort_order', 'asc')->get();

        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'organization' => 'required|string|max:150',
            'type' => 'required|string|in:education,experience,organization,award',
            'period' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:1000',
            'sort_order' => 'integer',
        ]);

        Experience::create($validated);

        return back()->with('success', 'Riwayat berhasil ditambahkan!');
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'organization' => 'required|string|max:150',
            'type' => 'required|string|in:education,experience,organization,award',
            'period' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:1000',
            'sort_order' => 'integer',
        ]);

        $experience->update($validated);

        return back()->with('success', 'Riwayat berhasil diperbarui!');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return back()->with('success', 'Riwayat berhasil dihapus.');
    }

    /**
     * Simpan urutan baru hasil drag & drop.
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:experiences,id',
        ]);

        foreach ($validated['ids'] as $index => $id) {
            Experience::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return back()->with('success', 'Urutan riwayat berhasil disimpan.');
    }

    /**
     * Urutkan semua riwayat berdasarkan periode (paling lama / paling baru dulu).
     */
    public function sortByPeriod(Request $request)
    {
        $direction = $request->validate([
            'direction' => 'required|string|in:asc,desc',
        ])['direction'];

        $experiences = Experience::all()->sortBy(
            fn (Experience $experience) => $experience->period_start?->timestamp ?? PHP_INT_MAX,
            SORT_REGULAR,
            $direction === 'desc'
        )->values();

        foreach ($experiences as $index => $experience) {
            $experience->update(['sort_order' => $index + 1]);
        }

        return back()->with('success', 'Riwayat diurutkan dari periode paling '.($direction === 'asc' ? 'lama' : 'baru').'.');
    }
}
