<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Book;

class BookController extends Controller
{
    public function index(Request $request) {
        $data = Book::with('author', 'shelf', 'publisher')
                    ->withCount('views');
        $perPage = 10;
        if ($request->filled('per_page')) $perPage = $request->query('per_page');
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data->where('title', 'like', "%$q%")
            ->orWhere('isbn', 'like', "%$q%");
        }
        $data->orderBy('created_at', 'desc');
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => $data->paginate($perPage), 
            'success' => TRUE
        ]);
    }

    public function recent(Request $request) {
        $data = Book::with('author', 'shelf', 'publisher')
                    ->withCount('views');
        $perPage = 10;
        if ($request->filled('per_page')) $perPage = $request->query('per_page');
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data->where('title', 'like', "%$q%")
            ->orWhere('isbn', 'like', "%$q%");
        }
        $data->orderBy('created_at', 'desc');
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => $data->paginate($perPage), 
            'success' => TRUE
        ]);
    }

    public function mostView(Request $request) {
        $data = Book::with('author', 'shelf', 'publisher')
                    ->withCount('views');
        $perPage = 10;
        if ($request->filled('per_page')) $perPage = $request->query('per_page');
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data->where('title', 'like', "%$q%")
            ->orWhere('isbn', 'like', "%$q%");
        }
        $data->orderBy('views_count', 'desc');
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => $data->paginate($perPage), 
            'success' => TRUE
        ]);
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
