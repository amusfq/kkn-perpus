<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\BookController;

Route::get('/ping', function (Request $request) {
    return response()->json(['meta' => [
        'ip' => $request->ips(),
        'userAgent' => $request->userAgent(),
    ],'data' => 'pong', 'success' => TRUE]);
});

Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'index']);
});

Route::prefix('publisher')->group(function () {
    Route::get('/', [PublisherController::class, 'index']);
});

Route::prefix('author')->group(function () {
    Route::get('/', [AuthorController::class, 'index']);
});

Route::prefix('book')->group(function () {
    Route::get('/', [BookController::class, 'index']);
    Route::get('/recent', [BookController::class, 'Recent']);
    Route::get('/views', [BookController::class, 'MostView']);
});