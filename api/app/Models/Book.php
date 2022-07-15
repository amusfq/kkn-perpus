<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'cover',
        'author_id',
        'published_date',
        'quantity',
        'isbn',
        'slug',
        'shelf_id',
        'publisher_id',
        'category_id'
    ];

    public function getCoverAttribute($value)
    {
            return URL::to("api/$value");
    }

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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
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
