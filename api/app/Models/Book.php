<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author_id',
        'published_date',
        'quantity',
        'isbn',
        'shelf_id',
        'publisher_id'
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function shelf()
    {
        return $this->belongsTo(Shelf::class);
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function views()
    {
        return $this->hasMany(BookViews::class);
    }

    protected $hidden = [
        'author_id',
        'shelf_id',
        'publisher_id',
    ];
}
