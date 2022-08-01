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
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoanController;

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
    Route::get('/{id}', 'getByID');
    Route::post('/', 'create');
    Route::post('status', 'updateStatus');
    Route::put('/reset-password/{id}', 'resetPassword');
    Route::put('/{id}', 'update');
});

Route::prefix('publisher')->controller(PublisherController::class)->middleware('jwt.verify')->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'getByID');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});

Route::prefix('shelf')->controller(ShelfController::class)->middleware('jwt.verify')->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'getByID');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});


Route::prefix('language')->controller(LanguageController::class)->middleware('jwt.verify')->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'getByID');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});

Route::prefix('category')->controller(CategoryController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{slug}', 'getBySlug');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});

Route::prefix('author')->controller(AuthorController::class)->middleware('jwt.verify')->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'getByID');
    Route::post('/', 'create');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'delete');
});

Route::prefix('loan')->controller(LoanController::class)->middleware('jwt.verify')->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'getByID');
    Route::post('/', 'create');
    Route::post('/return/{id}', 'retur');
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

Route::prefix('dashboard')->controller(DashboardController::class)->middleware('jwt.verify')->group(function () {
    Route::get('/', 'index');
});