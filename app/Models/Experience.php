<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Experience extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    /**
     * Tanggal mulai dari kolom `period` (mis. "Apr 2025 - Jun 2025").
     * Dipakai untuk mengurutkan riwayat dari paling lama / paling baru.
     */
    public function getPeriodStartAttribute(): ?Carbon
    {
        $start = trim(explode(' - ', (string) $this->period)[0]);

        if ($start === '') {
            return null;
        }

        foreach (['M Y', 'F Y', 'Y'] as $format) {
            try {
                return Carbon::createFromFormat($format, $start)->startOfMonth();
            } catch (\Throwable) {
                continue;
            }
        }

        try {
            return Carbon::parse($start);
        } catch (\Throwable) {
            return null;
        }
    }
}
