<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;
use App\Models\Publisher;
use App\Models\Category;
use App\Models\Loan;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = [
            "books" => Book::where('is_deleted', 0)->count(),
            "authors" => Author::where('is_deleted', 0)->count(),
            "publishers" => Publisher::where('is_deleted', 0)->count(),
            "categories" => Category::where('is_deleted', 0)->count(),
            "loans" => Loan::where('is_returned', 0)->count(),
            "popular_books" => Book::where('is_deleted', 0)
                ->with('author', 'shelf', 'publisher', 'category', 'language')
                ->withCount('views')->orderBy('views_count', 'desc')->limit(5)->get(),
        ];

        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
}
