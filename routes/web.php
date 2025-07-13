<?php

use App\Http\Controllers\CreateRequestController;
use App\Http\Controllers\RequestHistoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/create-request', [CreateRequestController::class, 'index'])->name('create-request.index');
    Route::get('/request-history', [RequestHistoryController::class, 'index'])->name('request-history.index');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
