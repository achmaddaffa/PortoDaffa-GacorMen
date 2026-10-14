<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('sort_order', 'asc')->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
            'isEdit' => false,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'category' => 'required|string|max:100',
            'role' => 'nullable|string|max:150',
            'tools' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:50',
            'description' => 'required|string|max:2000',
            'problem' => 'nullable|string|max:2000',
            'solution' => 'nullable|string|max:2000',
            'result' => 'nullable|string|max:2000',
            'image_url' => 'nullable|string|max:500',
            'demo_url' => 'nullable|url|max:255',
            'drive_url' => 'nullable|url|max:255',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(4);

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project berhasil ditambahkan!');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
            'isEdit' => true,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'category' => 'required|string|max:100',
            'role' => 'nullable|string|max:150',
            'tools' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:50',
            'description' => 'required|string|max:2000',
            'problem' => 'nullable|string|max:2000',
            'solution' => 'nullable|string|max:2000',
            'result' => 'nullable|string|max:2000',
            'image_url' => 'nullable|string|max:500',
            'demo_url' => 'nullable|url|max:255',
            'drive_url' => 'nullable|url|max:255',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project berhasil diperbarui!');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project berhasil dihapus.');
    }
}
