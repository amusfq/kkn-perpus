<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }
    
    public function login(Request $request)
    {
        $statusCode = 200;
        $status = TRUE;
        $errors = [];
        $data = "";

        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            $statusCode = 400;
            $errors = $validator->messages();
            $status = FALSE;
        } else {
            $credentials = $request->only('username', 'password');

            $token = Auth::attempt($credentials);
            if (!$token) {
                $statusCode = 401;
                $errors = [ "Username atau password salah" ];
                $status = FALSE;
            } else {
                $data = [
                    'user' => Auth::user(),
                    'authorisation' => [
                        'token' => $token,
                        'type' => 'bearer',
                    ]
                ];
            }
        }
        
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => $data,
            'errors' => $errors,
            'success' => $status
        ], $statusCode);

    }

    public function profile(Request $request)
    {
        $statusCode = 200;
        $status = TRUE;
        $errors = [];
        $data = "";
        
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => Auth::user(),
            'errors' => $errors,
            'success' => $status
        ], $statusCode);

    }

    public function register(Request $request){
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        
        $data = [
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ];
        
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => $data,
            'success' => $status
        ], $statusCode);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
