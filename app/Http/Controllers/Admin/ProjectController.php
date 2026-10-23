<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private const DISK = 'local';

    private const DIR = 'projects';

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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:8192',
            'remove_image' => 'boolean',
            'demo_url' => 'nullable|url|max:255',
            'drive_url' => 'nullable|url|max:255',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        unset($validated['image'], $validated['remove_image']);

        $validated['slug'] = Str::slug($validated['title']).'-'.Str::random(4);

        $project = Project::create($validated);

        $this->syncImage($request, $project);

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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:8192',
            'remove_image' => 'boolean',
            'demo_url' => 'nullable|url|max:255',
            'drive_url' => 'nullable|url|max:255',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        unset($validated['image'], $validated['remove_image']);

        $project->update($validated);

        $this->syncImage($request, $project);

        return redirect()->route('admin.projects.index')->with('success', 'Project berhasil diperbarui!');
    }

    public function destroy(Project $project)
    {
        $this->deleteImageFile($project);

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project berhasil dihapus.');
    }

    private function syncImage(Request $request, Project $project): void
    {
        if ($request->hasFile('image')) {
            $this->deleteImageFile($project);

            $project->update(['image_path' => $request->file('image')->store(self::DIR, self::DISK)]);
        }

        if ($request->boolean('remove_image')) {
            $this->deleteImageFile($project);
            $project->update(['image_path' => null]);
        }
    }

    private function deleteImageFile(Project $project): void
    {
        if (! empty($project->image_path) && Storage::disk(self::DISK)->exists($project->image_path)) {
            Storage::disk(self::DISK)->delete($project->image_path);
        }
    }
}
