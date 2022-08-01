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
        'code',
        'slug',
        'shelf_id',
        'publisher_id',
        'category_id',
        'pages',
        'language_id',
        'is_deleted'
    ];

    public function getCoverAttribute($value)
    {
            return URL::to("api/$value");
    }

    public function getQuantityAttribute($value)
    {
            return $value - $this->hasMany(Loan::class)->where('is_returned', 0)->count();
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

    public function borrowed() 
    {
        return $this->hasMany(Loan::class)->where('is_returned', 0);
    }

    protected $hidden = [
        'author_id',
        'shelf_id',
        'publisher_id',
    ];  

    protected $casts = [
        'borrowed_count' => 'integer',
        'category_id' => 'integer',
        'is_deleted' => 'integer',
        'language_id' => 'integer',
        'pages' => 'integer',
        'views_count' => 'integer',
        'published_date' => 'integer',
    ];
}
