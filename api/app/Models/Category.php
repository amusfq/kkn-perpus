<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'slug',
        'is_deleted'
    ];

    public function getIconAttribute($value)
    {
            return URL::to("api/$value");
    }

    protected $casts = [
        'is_deleted' => 'integer',
    ];
}
