<?php 

  if ( ! function_exists('returnJSON'))
  {
    function returnJSON($request, $data = "", $status = TRUE, $statusCode = 200, $errors = []) {
        return response()->json([
            'meta' => [
                'ip' => $request->ips(),
                'userAgent' => $request->userAgent(),
                'query' => $request->query(),
            ],
            "data" => $data, 
            "errors" => $errors,
            'success' => $status
        ], $statusCode);
    }
  }