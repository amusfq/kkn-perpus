<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shelf extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'is_deleted'
    ];

    protected $casts = [
        'is_deleted' => 'integer',
    ];
}
