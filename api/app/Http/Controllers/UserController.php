<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        $data = User::select()->where('status', '!=', -1);
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('fullname', 'like', "%$q%")
            ->orWhere('username', 'like', "%$q%");
        }
        $data = $data->paginate();
        
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function updateStatus(Request $request) {
        $data = "";
        $errors = [];
        $status = TRUE;
        try {
            if (!$request->user_id) throw new \Exception('User ID is required');
            if (!$request->status) throw new \Exception('Status is required');
            if ($request->status != 'active' && $request->status != 'inactive' && $request->status != 'delete') throw new \Exception('Status is invalid');
            $user = User::find($request->user_id);
            if (!$user) throw new \Exception('Pengguna tidak ditemukan');
            $user->status = $request->status == 'active' ? 1 : $request->status == 'delete' ? -1 : 0;
            $user->save();
            $data = 'success';
        } catch (\Exception $e) {
            $data = "";
            array_push($errors, $e->getMessage());
            $status = FALSE;
        }
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            'data' => $data, 
            'errors' => $errors,
            'success' => $status
        ]);
    }
}
