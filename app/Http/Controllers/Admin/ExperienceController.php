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
}
