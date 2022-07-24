<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookViews extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'ip',
        'country',
        'city',
        'state',
        'long',
        'lat'
    ];
}
