<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = Category::select();
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('name', 'like', "%$q%")
            ->orWhere('slug', 'like', "%$q%");
        }
        $data = $data->get();
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
    public function getBySlug(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = Category::select()->where('slug', $request->slug)->first();
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
}
