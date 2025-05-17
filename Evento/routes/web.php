<?php

use App\Http\Controllers\EventFeedbackController;


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RoleRequestController;
use App\Http\Controllers\UserInterstsIdController;

Route::get('/userinterstsid', [UserInterstsIdController::class, 'index'])->name('userinterstsid.index');

Route::put('/rolerequest/{id}', [RoleRequestController::class, 'update'])->name('rolerequest.update');




Route::middleware(['auth'])->group(function () {
    Route::resource('feedback', EventFeedbackController::class);
});


Route::resource('rolerequest', RoleRequestController::class);

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::resource('datacategories', CategoriesController::class);


Route::resource('userinterstsid', UserInterstsIdController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
