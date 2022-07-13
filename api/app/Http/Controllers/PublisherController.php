<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publisher;

class PublisherController extends Controller
{
    public function index(Request $request) {
        $data = Publisher::select();
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data->where('name', 'like', "%$q%")
            ->orWhere('address', 'like', "%$q%");
        }
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => $data->paginate(10), 
            'success' => TRUE
        ]);
    }
}
