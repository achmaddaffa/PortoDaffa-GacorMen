<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileSettingController extends Controller
{
    public function edit()
    {
        $profile = Profile::firstOrCreate(['id' => 1]);

        return Inertia::render('Admin/ProfileSetting', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request)
    {
        $profile = Profile::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'headline' => 'required|string|max:200',
            'bio_summary' => 'required|string|max:2500',
            'university' => 'required|string|max:150',
            'study_program' => 'required|string|max:200',
            'semester' => 'required|string|max:50',
            'focus_area' => 'required|string|max:200',
            'internship_seeking' => 'required|string|max:200',
            'goals_academic' => 'nullable|string|max:1000',
            'goals_career' => 'nullable|string|max:1000',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:50',
            'location' => 'required|string|max:150',
            'linkedin_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'drive_portfolio_url' => 'nullable|url|max:255',
            'resume_path' => 'nullable|string|max:255',
            'avatar_url' => 'nullable|string|max:500',
            'hero_badge' => 'nullable|string|max:100',
        ]);

        $profile->update($validated);

        return back()->with('success', 'Profil portfolio berhasil diperbarui!');
    }
}
