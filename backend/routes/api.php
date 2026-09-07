<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::delete('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
