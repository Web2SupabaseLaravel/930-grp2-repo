<?php

use App\Http\Controllers\EventFeedbackController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RoleRequestController;

use App\Http\Controllers\UserInterstsIdController;
use App\Http\Controllers\TicketsController;




Route::resource('tickets', TicketsController::class);


Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Event routes
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show')->where('event', '[0-9]+');
    Route::get('/events/{event}/edit', [EventController::class, 'edit'])->name('events.edit')->where('event', '[0-9]+');
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update')->where('event', '[0-9]+');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy')->where('event', '[0-9]+');

    // Feedback routes
    Route::resource('feedback', EventFeedbackController::class);
});

// Role request routes
Route::resource('rolerequest', RoleRequestController::class);
Route::put('/rolerequest/{id}', [RoleRequestController::class, 'update'])->name('rolerequest.update');

//user intrest
Route::resource('userinterstsid', UserInterstsIdController::class);


require __DIR__.'/auth.php';
