<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProfileSettingController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Portfolio Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.home');
Route::get('/cv', [PortfolioController::class, 'cv'])->name('portfolio.cv');
Route::get('/projects/{project:slug}', [PortfolioController::class, 'project'])->name('portfolio.project');
Route::get('/avatar/{download?}', [PortfolioController::class, 'avatar'])->name('portfolio.avatar');
Route::get('/projects/{project}/image/{download?}', [PortfolioController::class, 'projectImage'])->name('portfolio.project-image');
Route::post('/contact', [PortfolioController::class, 'contact'])->name('portfolio.contact');

/*
|--------------------------------------------------------------------------
| Admin Panel Routes (Protected by Auth)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->name('dashboard');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Portfolio Profile Setting
    Route::get('/profile-setting', [ProfileSettingController::class, 'edit'])->name('profile-setting.edit');
    Route::post('/profile-setting', [ProfileSettingController::class, 'update'])->name('profile-setting.update');

    // Projects CRUD
    Route::resource('projects', ProjectController::class)->except(['show']);

    // Skills CRUD
    Route::resource('skills', SkillController::class)->only(['index', 'store', 'update', 'destroy']);

    // Experiences CRUD
    Route::resource('experiences', ExperienceController::class)->only(['index', 'store', 'update', 'destroy']);

    // Contact Messages Inbox
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::patch('/messages/{message}/read', [MessageController::class, 'markAsRead'])->name('messages.read');
    Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
