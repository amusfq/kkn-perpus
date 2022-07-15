<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = Author::select();
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('fullname', 'like', "%$q%")
            ->orWhere('address', 'like', "%$q%");
        }

        return returnJSON($request, $data->pagenate(10), $status, $statusCode, $errors);
    }
}
