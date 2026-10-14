<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
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
