<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::middleware(['auth'])->group(function() {
    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    Route::post('/form', [Usercontroller::class, 'submit'])->name('submit');
    Route::get('/print/{carId}', [UserController::class, 'print'])->name('car.print');
});
