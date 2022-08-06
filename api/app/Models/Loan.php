<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'user_id',
        'is_returned',
        'peminjam',
        'kelas',
        'return_date',
    ];

    public function getIsReturnedAttribute($value)
    {
        if ($value == 0) if ($this->return_date < Carbon::today()) return -1;
        return $value;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    protected $hidden = [
        'user_id',
        'book_id',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'book_id' => 'integer',
        'is_returned' => 'integer',
    ];
}
