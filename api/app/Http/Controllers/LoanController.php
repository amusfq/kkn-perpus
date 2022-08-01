<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use Illuminate\Support\Facades\Validator;

class LoanController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        $perPage = 10;

        $data = Loan::with('user', 'book');
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('name', 'like', "%$q%")
            ->orWhere('location', 'like', "%$q%");
        }
        if ($request->filled('per_page')) $perPage = $request->query('per_page');

        return returnJSON($request, $data->paginate($perPage), $status, $statusCode, $errors);
    }
    
    public function getByID(Request $request, $id) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = Loan::find($id);
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function create(Request $request) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'location' => 'required',
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {
            $data = Loan::create([
                'name' => $request->name,
                'location' => $request->location,
            ]);
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function retur(Request $request, $id) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;
        
            $data = Loan::find($id);
            $data->is_returned = 1;
            $data->save();
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function delete(Request $request, $id) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $data = Loan::find($id);
        if (!$data) {
            $status = FALSE;
            $statusCode = 400;
            $errors = ['data' => 'Data Penulis tidak ditemukan'];
        } else {
            $data->is_deleted = 1;
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
}
