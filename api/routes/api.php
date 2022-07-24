<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ShelfController;

Route::get('ping', function (Request $request) {
    return response()->json(['meta' => [
        'ip' => $request->ips(),
        'userAgent' => $request->userAgent(),
    ],'data' => 'pong', 'success' => TRUE]);
});

Route::get('images/{filename}', [ResourceController::class, 'image']);

Route::controller(AuthController::class)->group(function () {
    Route::get('profile', 'profile')->name('profile');
    Route::post('login', 'login')->name('profile');
    Route::post('register', 'register')->name('register');
    Route::post('logout', 'logout')->name('logout');
    Route::post('refresh', 'refresh')->name('refresh');
});

Route::prefix('user')->controller(UserController::class)->middleware('jwt.verify')->group(function () {
    Route::get('/', 'index');
    Route::post('status', 'updateStatus');
});

Route::prefix('publisher')->controller(PublisherController::class)->group(function () {
    Route::get('/', 'index');
});

Route::prefix('shelf')->controller(ShelfController::class)->group(function () {
    Route::get('/', 'index');
});


Route::prefix('language')->controller(LanguageController::class)->group(function () {
    Route::get('/', 'index');
});

Route::prefix('category')->controller(CategoryController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{slug}', 'getBySlug');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});

Route::prefix('author')->controller(AuthorController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'getByID');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});

Route::prefix('book')->controller(BookController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/random', 'random');
    Route::get('/view/{id}', 'increaseView');
    Route::get('/{slug}', 'getBookBySlug');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});