<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'proficiency' => 'integer',
        'sort_order' => 'integer',
    ];
}
