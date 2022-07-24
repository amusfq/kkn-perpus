<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        $perPage = 10;

        $data = Category::select()->where('is_deleted', 0);
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('name', 'like', "%$q%")
            ->orWhere('slug', 'like', "%$q%");
        }
        if ($request->filled('per_page')) $perPage = $request->query('per_page');
        $data = $data->paginate($perPage);
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

    public function create(Request $request) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $validator = Validator::make($request->all(), [
            'icon' => 'mimes:jpg,jpeg,png|max:2048',
            'name' => 'required|max:255',
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {

            $slug = Str::slug($request->name, '-');
            if (Category::where('slug', $slug)->exists()) $slug = $slug . '-' . Str::uuid();

            $path = $request->file('icon')->store('images');
            if (! $path) {
                $errors = "Gagal menyimpan file : $path";
                $status = FALSE;
                $statusCode = 500;
            } else {
                $data = Category::create([
                    'name' => $request->name,
                    'icon' => $path,
                    'slug' => $slug,
                ]);
            }
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function update(Request $request, $id) {
        $statusCode = 200;
        $validator = Validator::make($request->all(), [
            'icon' => 'mimes:jpg,jpeg,png|max:2048',
            'name' => 'required',
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
            if ($request->hasFile('icon')) $path = $request->file('icon')->store('images');
            if (!$path) {
                $errors = "Gagal menyimpan file : $path";
                $status = FALSE;
                $statusCode = 500;
            } else {
                $data = Category::find($id);

                $data->name = $request->name;
                if ($request->hasFile('icon')) $data->icon = $path;
                $slug = Str::slug($request->name, '-');
                if (Category::where('slug', $slug)->exists()) $slug = $slug . '-' . Str::uuid();
                $data->slug = $slug;
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

        $data = Category::find($id);
        if (!$data) {
            $status = FALSE;
            $statusCode = 400;
            $errors = ['data' => 'Data kategori tidak ditemukan'];
        } else {
            $data->is_deleted = 1;
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
}
