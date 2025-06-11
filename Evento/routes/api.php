<?php

use App\Http\Controllers\DashboardUserController;
use App\Http\Controllers\DashBordUser;
use App\Http\Controllers\ApiControllers\CreateEventApi;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiControllers\EventFeedbackApiController;
use App\Http\Controllers\ApiControllers\RoleRequestApiController;

use App\Http\Controllers\ApiControllers\UserInterstsIdApiController;
use App\Http\Controllers\ApiControllers\CategoriesApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->middleware('jwt')->group(function () {
    Route::resource('events', CreateEventApi::class);
    Route::resource('userintersts', UserInterstsIdApiController::class);
    Route::resource('datacategories', CategoriesApiController::class);
    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);
});

Route::prefix('api')->group(function () {
    Route::post('register', [JWTAuthController::class, 'register']);
    Route::post('login', [JWTAuthController::class, 'login']);
});

Route::get('/events', [CreateEventApi::class, 'index']);
Route::put('/events/{id}', [CreateEventApi::class, 'update']);

Route::resource('api/role-requests', RoleRequestApiController::class);


Route::resource('userintersts', UserInterstsIdApiController::class);
Route::resource('datacategories', CategoriesApiController::class);


Route::get('/role-requests', [RoleRequestApiController::class, 'index']);
Route::put('/role-requests/{id}', [RoleRequestApiController::class, 'update']);

Route::resource('feedback', EventFeedbackApiController::class);
