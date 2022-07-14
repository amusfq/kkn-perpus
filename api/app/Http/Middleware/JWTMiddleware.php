<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\BaseMiddleware;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;

class JWTMiddleware extends BaseMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return $next($request);
        } catch (Exception $e) {
            $data = "";
            $status = TRUE;
            $statusCode = 200;
            $errors = [];
            if ($e instanceof TokenInvalidException){
                $errors = ['Token is invalid'];
                $statusCode = 401;
                $status = FALSE;
            }else if ($e instanceof TokenExpiredException){                
                $errors = ['Token is expired'];
                $statusCode = 401;
                $status = FALSE;
            } else if ($e instanceof UserNotDefinedException) {
                $errors = ['User unauthorized'];
                $statusCode = 401;
                $status = FALSE;
            } else{
                $errors = ['Authorization token not found'];
                $statusCode = 401;
                $status = FALSE;
            }
            return returnJSON($request, $data, $status, $statusCode, $errors);
        }
    }
}
