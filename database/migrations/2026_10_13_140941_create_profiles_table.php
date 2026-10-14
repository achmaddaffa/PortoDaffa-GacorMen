<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->default('Achmad Daffa Ihtifazuddin');
            $table->string('headline')->default('Mechanical Engineering Student | Piping Engineering Enthusiast');
            $table->text('bio_summary')->nullable();
            $table->string('university')->default('Universitas Gadjah Mada');
            $table->string('study_program')->default('D4 Mechanical Engineering Technology, School of Vocational Studies');
            $table->string('semester')->default('Semester 5');
            $table->string('focus_area')->default('Piping Engineering & P&ID');
            $table->string('internship_seeking')->default('Seeking an internship in the oil & gas industry');
            $table->text('goals_academic')->nullable();
            $table->text('goals_career')->nullable();
            $table->string('email')->default('daffaihtifazuddin@gmail.com');
            $table->string('phone')->nullable();
            $table->string('location')->default('Central Java, Indonesia');
            $table->string('linkedin_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('drive_portfolio_url')->nullable();
            $table->string('resume_path')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('hero_badge')->default('Available for Oil & Gas Internship');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
