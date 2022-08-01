<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Book;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        $isPagination = true;

        $data = Book::with('author', 'shelf', 'publisher', 'category', 'language')
                    ->withCount('views', 'borrowed')
                    ->where('is_deleted', 0);
        $perPage = 10;
        if ($request->filled('per_page')) $perPage = $request->query('per_page');
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('title', 'like', "%$q%")
            ->orWhere('code', 'like', "%$q%")
            ->orWhereHas('author', function($query) use ($q) {
                $query->where('fullname', 'like', "%$q%");
            })
            ->orWhereHas('shelf', function($query) use ($q) {
                $query->where('name', 'like', "%$q%")
                    ->where('location', 'like', "%$q%");
            })
            ->orWhereHas('publisher', function($query) use ($q) {
                $query->where('name', 'like', "%$q%");
            })->orWhereHas('category', function($query) use ($q) {
                $query->where('name', 'like', "%$q%");
            })->orWhereHas('language', function($query) use ($q) {
                $query->where('name', 'like', "%$q%");
            });
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
        if ($request->filled('is_pagination')) {
            $pagination = $request->query('is_pagination');
            $isPagination = $pagination != 'false';
        }

        if ($isPagination) {
            $data = $data->paginate($perPage);
        } else {
            $data = $data->get();
        }
            
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function getBookBySlug(Request $request, $slug) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = Book::with('author', 'shelf', 'publisher', 'category', 'language')
                    ->withCount('views')
                    ->where('slug', $slug)
                    ->first();
        if (!$data) {
            $status = FALSE;
            $statusCode = 404;
            $errors = ['Buku tidak ditemukan'];
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function random(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        
        $data = Book::with('author', 'shelf', 'publisher', 'category', 'language')
            ->withCount('views')
            ->inRandomOrder()
            ->where('is_deleted', 0)
            ->first();   
            
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function create(Request $request) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $validator = Validator::make($request->all(), [
            'cover' => 'mimes:jpg,jpeg,png|max:2048',
            'title' => 'required',
            'author_id' => 'required|exists:authors,id',
            'publisher_id' => 'required|exists:publishers,id',
            'category_id' => 'required|exists:categories,id',
            'language_id' => 'required|exists:languages,id',
            'shelf_id' => 'required|exists:shelves,id',
            'published_date' => 'required',
            'quantity' => 'required|integer|min:1',
            'code' => 'required|string|max:255|unique:books,code',
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {

            $slug = Str::slug($request->title, '-');
            if (Book::where('slug', $slug)->exists()) $slug = $slug . '-'. $request->code;

            $path = true;
            if ($request->hasFile('cover')) $path = $request->file('cover')->store('images');
            if (! $path) {
                $errors = "Gagal menyimpan file : $path";
                $status = FALSE;
                $statusCode = 500;
            } else {
                $data = Book::create([
                    'title' => $request->title,
                    'cover' => $request->hasFile('cover') ? $path : '',
                    'author_id' => $request->author_id,
                    'publisher_id' => $request->publisher_id,
                    'category_id' => $request->category_id,
                    'language_id' => $request->language_id,
                    'shelf_id' => $request->shelf_id,
                    'published_date' => $request->published_date,
                    'quantity' => $request->quantity,
                    'code' => $request->code,
                    'pages' => $request->pages,
                    'slug' => $slug,
                ]);
            }
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function increaseView(Request $request, $id) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $user = Auth::user();
        $book = Book::find($id);
        if (!$book) {
            $statusCode = 404;
            $errors = [ "book" => "Buku tidak ditemukan" ];
            $status = FALSE;
        } else {
            if (!$user) {
                $geo = geoip()->getLocation();
                $book->views()->create([
                    'ip' => $geo->ip,
                    'country' => $geo->country,
                    'city' => $geo->city,
                    'state' => $geo->state_name,
                    'long' => $geo->lon,
                    'lat' => $geo->lat,
                ]);
            }
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function update(Request $request, $id) {
        $statusCode = 200;
        $validator = Validator::make($request->all(), [
            'cover' => 'mimes:jpg,jpeg,png|max:2048',
            'title' => 'required|max:255',
            'author_id' => 'required|exists:authors,id',
            'publisher_id' => 'required|exists:publishers,id',
            'category_id' => 'required|exists:categories,id',
            'language_id' => 'required|exists:languages,id',
            'shelf_id' => 'required|exists:shelves,id',
            'published_date' => 'required',
            'quantity' => 'required|integer|min:1',
            'code' => ['required','string','max:255', Rule::unique('books', 'code')->ignore($request->id)],
        ]);
        $data = "";
        $errors = [];
        $status = TRUE;
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {
            $path = true;
            if ($request->hasFile('cover')) $path = $request->file('cover')->store('images');
            if (!$path) {
                $errors = "Gagal menyimpan file : $path";
                $status = FALSE;
                $statusCode = 500;
            } else {
                $data = Book::find($id);

                $data->title = $request->title;
                if ($request->hasFile('cover')) $data->cover = $path;
                $data->author_id = $request->author_id;
                $data->publisher_id = $request->publisher_id;
                $data->category_id = $request->category_id;
                $data->language_id = $request->language_id;
                $data->shelf_id = $request->shelf_id;
                $data->published_date = $request->published_date;
                $data->quantity = $request->quantity;
                $data->code = $request->code;
                if ($request->filled('pages') && $request->pages != 'null') $data->pages = $request->pages;
                $data->save();
            }
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function delete(Request $request, $id) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $data = Book::find($id);
        if (!$data) {
            $status = FALSE;
            $statusCode = 400;
            $errors = ['data' => 'Data buku tidak ditemukan'];
        } else {
            $data->is_deleted = 1;
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
}
