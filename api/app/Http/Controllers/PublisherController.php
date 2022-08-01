<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publisher;
use Illuminate\Support\Facades\Validator;

class PublisherController extends Controller
{
    public function index(Request $request) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];
        $perPage = 10;

        $data = Publisher::where('is_deleted', 0);
        if ($request->filled('q')) {
            $q = $request->query('q');
            $data = $data->where('name', 'like', "%$q%")
            ->orWhere('address', 'like', "%$q%");
        }
        if ($request->filled('per_page')) $perPage = $request->query('per_page');

        return returnJSON($request, $data->paginate($perPage), $status, $statusCode, $errors);
    }
    
    public function getByID(Request $request, $id) {
        $data = "";
        $status = TRUE;
        $statusCode = 200;
        $errors = [];

        $data = Publisher::find($id);
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function create(Request $request) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'address' => 'required',
        ]);
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {
            $data = Publisher::create([
                'name' => $request->name,
                'address' => $request->address,
            ]);
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function update(Request $request, $id) {
        $statusCode = 200;
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'address' => 'required',
        ]);
        $data = "";
        $errors = [];
        $status = TRUE;
        
        if ($validator->fails()) {
            $errors = $validator->messages();
            $status = FALSE;
            $statusCode = 400;
        } else {
            $data = Publisher::find($id);

            $data->name = $request->name;
            $data->address = $request->address;
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }

    public function delete(Request $request, $id) {
        $statusCode = 200;
        $data = "";
        $errors = [];
        $status = TRUE;

        $data = Publisher::find($id);
        if (!$data) {
            $status = FALSE;
            $statusCode = 400;
            $errors = ['data' => 'Data Penerbit tidak ditemukan'];
        } else {
            $data->is_deleted = 1;
            $data->save();
        }
        return returnJSON($request, $data, $status, $statusCode, $errors);
    }
}
