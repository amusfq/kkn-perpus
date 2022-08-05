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
                $user = Auth::user();
                if ($user->status != 1) {
                    $statusCode = 401;
                    $errors = $user->status == -1 ? [ "Pengguna telah dihapus" ] : ["Pengguna dinonaktifkan, silahkan hubungi admin"] ;
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
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function profile(Request $request)
    {
        $statusCode = 200;
        $status = TRUE;
        $errors = [];
        $data = "";

        $data = Auth::user();
        
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function register(Request $request){
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
            
        ]);

        if ($validator->fails()) {
            $statusCode = 400;
            $errors = $validator->messages();
            $status = FALSE;
        } else {
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
        }
        
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function update(Request $request) {
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            
        ]);

        if ($validator->fails()) {
            $statusCode = 400;
            $errors = $validator->messages();
            $status = FALSE;
        } else {
            $user = Auth::user();
            $data = User::find($user->id);
            $data->fullname = $request->fullname;
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function updatePassword(Request $request) {
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $validator = Validator::make($request->all(), [
            'password' => 'required|confirmed|min:8'
        ]);

        if ($validator->fails()) {
            $statusCode = 400;
            $errors = $validator->messages();
            $status = FALSE;
        } else {
            $user = Auth::user();
            $data = User::find($user->id);
            $data->password = Hash::make($request->password);
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function logout(Request $request)
    {
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        $data = 'Successfully logged out';
        Auth::logout();
        
        return returnJSON($request, $data, $status, $statusCode, $errors);
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
