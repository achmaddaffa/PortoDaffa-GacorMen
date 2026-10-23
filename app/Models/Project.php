<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = ['image_src'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    /**
     * Gambar proyek: file upload diutamakan, URL eksternal jadi fallback.
     */
    public function getImageSrcAttribute(): ?string
    {
        if (! empty($this->image_path)) {
            return route('portfolio.project-image', ['project' => $this->id, 'v' => substr(md5($this->image_path), 0, 8)]);
        }

        return $this->image_url ?: null;
    }
}
