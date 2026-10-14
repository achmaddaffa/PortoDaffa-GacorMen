<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Piping Engineering');
            $table->string('role')->nullable();
            $table->string('tools')->nullable();
            $table->string('year')->nullable();
            $table->text('description');
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->text('result')->nullable();
            $table->string('image_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('drive_url')->nullable();
            $table->boolean('is_featured')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
