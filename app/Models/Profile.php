<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['avatar_src', 'avatar_download_url'];

    /**
     * Foto profil: file upload diutamakan, URL eksternal jadi fallback.
     */
    public function getAvatarSrcAttribute(): ?string
    {
        if (empty($this->avatar_path)) {
            return null;
        }

        return route('portfolio.avatar', ['v' => substr(md5($this->avatar_path), 0, 8)]);
    }

    public function getAvatarDownloadUrlAttribute(): ?string
    {
        return empty($this->avatar_path) ? null : route('portfolio.avatar', ['download' => 'download']);
    }
}
