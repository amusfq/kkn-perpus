<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Book;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;

class BookController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = Book::with('author', 'shelf', 'publisher', 'category')
                    ->withCount('views');
        $perPage = 10;
        if ($request->filled('per_page')) $perPage = $request->query('per_page');
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('title', 'like', "%$q%")
            ->orWhere('isbn', 'like', "%$q%");
        }
        if ($request->filled('category_id')) {
            $category_id = $request->query('category_id');
            $data = $data->where('category_id', $category_id);
        }
        if ($request->filled('filter')) {
            $filter = $request->query('filter');
            if ($filter == 'popular') {
                $data = $data->orderBy('views_count', 'desc');
            } else {
                $data = $data->orderBy('created_at', 'desc');
            }
        } else {
            $data = $data->orderBy('created_at', 'desc');
        }
        $data = $data->paginate($perPage);
            
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function random(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        
        $data = Book::with('author', 'shelf', 'publisher', 'category')
            ->withCount('views')->inRandomOrder()->first();   
            
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function create(Request $request) {

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'cover' => 'required|mimes:jpg,jpeg,png|max:2048',
            'author' => 'required|exists:authors,id',
            'published_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
            'isbn' => 'required|string|max:255|unique:books,isbn',
            'shelf' => 'required|exists:shelves,id',
            'publisher' => 'required|exists:publishers,id',
        ]);
        $data = "";
        $errors = [];
        $status = TRUE;
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
        } else {
            $path = $request->file('cover')->store('images');
            if (! $path) {
                $errors = "Gagal menyimpan file : $path";
                $status = FALSE;
            } else {
                $data = Book::create([
                    'title' => $request->title,
                    'cover' => $path,
                    'author_id' => $request->author,
                    'published_date' => $request->published_date,
                    'quantity' => $request->quantity,
                    'isbn' => $request->isbn,
                    'shelf_id' => $request->shelf,
                    'publisher_id' => $request->publisher,
                ]);
            }
        }
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
            ],
            'data' => $data, 
            'errors' => $errors,
            'success' => $status
        ]);
    }
}
