<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

    public function Recent(Request $request) {
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

    public function MostView(Request $request) {
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
}
