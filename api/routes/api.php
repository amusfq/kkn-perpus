<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ResourceController;

Route::get('ping', function (Request $request) {
    return response()->json(['meta' => [
        'ip' => $request->ips(),
        'userAgent' => $request->userAgent(),
    ],'data' => 'pong', 'success' => TRUE]);
});
Route::get('images/{filename}', [ResourceController::class, 'image']);

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
    Route::post('/', [BookController::class, 'create']);
    Route::get('/recent', [BookController::class, 'recent']);
    Route::get('/views', [BookController::class, 'mostView']);
});