<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $profile = Profile::first();
        $projects = Project::orderBy('sort_order', 'asc')->get();
        $skills = Skill::orderBy('sort_order', 'asc')->get();
        $experiences = Experience::orderBy('sort_order', 'asc')->get();

        return Inertia::render('Portfolio/Home', [
            'profile' => $profile,
            'projects' => $projects,
            'skills' => $skills,
            'experiences' => $experiences,
        ]);
    }

    public function cv()
    {
        $profile = Profile::first();
        $projects = Project::orderBy('sort_order', 'asc')->get();
        $skills = Skill::orderBy('sort_order', 'asc')->get();
        $experiences = Experience::orderBy('sort_order', 'asc')->get();

        return Inertia::render('Portfolio/CV', [
            'profile' => $profile,
            'projects' => $projects,
            'skills' => $skills,
            'experiences' => $experiences,
        ]);
    }

    public function project(Project $project)
    {
        return Inertia::render('Portfolio/ProjectDetail', [
            'project' => $project,
            'relatedProjects' => Project::where('id', '!=', $project->id)
                ->where('category', $project->category)
                ->take(2)
                ->get(),
        ]);
    }

    public function projectImage(Project $project, ?string $download = null)
    {
        abort_if(empty($project->image_path) || ! Storage::disk('local')->exists($project->image_path), 404);

        $path = Storage::disk('local')->path($project->image_path);
        $name = 'proyek-'.str()->slug($project->title ?: 'project').'.'.pathinfo($path, PATHINFO_EXTENSION);

        return response()->file($path, [
            'Content-Type' => mime_content_type($path) ?: 'image/jpeg',
            'Content-Disposition' => ($download === 'download' ? 'attachment' : 'inline').'; filename="'.$name.'"',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    public function avatar(Request $request, ?string $download = null)
    {
        $profile = Profile::first();

        abort_if(empty($profile?->avatar_path) || ! Storage::disk('local')->exists($profile->avatar_path), 404);

        $path = Storage::disk('local')->path($profile->avatar_path);
        $name = 'foto-'.str()->slug($profile->full_name ?: 'profil').'.'.pathinfo($path, PATHINFO_EXTENSION);

        return response()->file($path, [
            'Content-Type' => mime_content_type($path) ?: 'image/jpeg',
            'Content-Disposition' => ($download === 'download' ? 'attachment' : 'inline').'; filename="'.$name.'"',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    public function contact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:3000',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Pesan Anda telah berhasil terkirim! Terima kasih telah menghubungi Achmad Daffa.');
    }
}
