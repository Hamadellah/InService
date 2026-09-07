<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ProfileController;


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::delete('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::put('/profile',[ProfileController::class,'completeProfile'])->middleware('auth:sanctum');