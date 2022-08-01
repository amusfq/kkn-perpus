<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
    
    public function getByID(Request $request, $id) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = User::find($id);
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function create(Request $request) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $validator = Validator::make($request->all(), [
            'fullname' => 'required',
            'username' => 'required|string|max:255|unique:users,username',
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {
            $password = Str::random(8);
            User::create([
                'fullname' => $request->fullname,
                'username' => $request->username,
                'password' => Hash::make($password)
            ]);
            $data = $password;
            $statusCode = 201;
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function update(Request $request, $id) {
        $statusCode = 200;
        $validator = Validator::make($request->all(), [
            'fullname' => 'required',
            'username' => ['required','string', Rule::unique('users', 'username')->ignore($id)],
        ]);
        $data = "";
        $errors = [];
        $status = TRUE;
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {
            $data = User::find($id);

            $data->fullname = $request->fullname;
            $data->username = $request->username;
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function resetPassword(Request $request, $id) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

            $user = User::find($id);
            if (!$user) {
                $data = ['user' => "Pengguna tidak ditemukan"];
                $status = FALSE;
                $statusCode = 404;
            }  else {
                $newPassword = Str::random(8);
                $user->password = Hash::make($newPassword);
                $user->save();
                $data = $newPassword;
            }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
}
