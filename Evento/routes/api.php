<?php

use App\Http\Controllers\DashboardUserController;
use App\Http\Controllers\DashBordUser;
use App\Http\Controllers\ApiControllers\CreateEventApi;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\ApiControllers\ProfileApiController;
use App\Http\Controllers\ApiControllers\EventFeedbackApiController;
use App\Http\Controllers\ApiControllers\RoleRequestApiController;
use App\Http\Controllers\ApiControllers\UserInterstsIdApiController;
use App\Http\Controllers\ApiControllers\CategoriesApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// مسارات عامة (بدون مصادقة)
Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

// مجموعة المسارات المحمية بـ jwt
Route::prefix('api')->middleware('jwt')->group(function () {
    // مسار الملف الشخصي
   

    Route::resource('/profile',ProfileApiController::class);

    // مسارات الأحداث
    Route::resource('events', CreateEventApi::class);
    Route::get('/events', [CreateEventApi::class, 'index']); // إضافة index إذا لزم الأمر
    Route::put('/events/{id}', [CreateEventApi::class, 'update']);

    // مسارات المصالح والفئات
    Route::resource('userintersts', UserInterstsIdApiController::class);
    Route::resource('datacategories', CategoriesApiController::class);

    // مسار المستخدم والخروج
    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);

    // مسارات طلبات الأدوار
    Route::resource('role-requests', RoleRequestApiController::class);
    Route::get('/role-requests', [RoleRequestApiController::class, 'index']);
    Route::put('/role-requests/{id}', [RoleRequestApiController::class, 'update']);

    // مسارات الملاحظات
    Route::resource('feedback', EventFeedbackApiController::class);
});
