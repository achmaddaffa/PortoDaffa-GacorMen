<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $profile = Profile::first();
        $totalProjects = Project::count();
        $totalSkills = Skill::count();
        $totalExperiences = Experience::count();
        $unreadMessagesCount = ContactMessage::where('is_read', false)->count();
        $recentMessages = ContactMessage::latest()->take(5)->get();
        $recentProjects = Project::latest()->take(4)->get();

        return Inertia::render('Admin/Dashboard', [
            'profile' => $profile,
            'stats' => [
                'totalProjects' => $totalProjects,
                'totalSkills' => $totalSkills,
                'totalExperiences' => $totalExperiences,
                'unreadMessagesCount' => $unreadMessagesCount,
            ],
            'recentMessages' => $recentMessages,
            'recentProjects' => $recentProjects,
        ]);
    }
}
