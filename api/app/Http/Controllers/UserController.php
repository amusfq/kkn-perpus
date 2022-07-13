<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request) {
        $data = User::select();
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data->where('fullname', 'like', "%$q%")
            ->orWhere('address', 'like', "%$q%");
        }
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            'data' => User::get(), 
            'success' => TRUE
        ]);
    }
}
