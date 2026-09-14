<?php
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ProfileController;
use App\Http\Controllers\api\ServiceController;


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::delete('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::put('/profile',[ProfileController::class,'completeProfile'])->middleware('auth:sanctum');
Route::get('/services',[ServiceController::class,'show']);
Route::middleware(['auth:sanctum','technicien'])->group(function(){
    Route::post('/addService',[ServiceController::class,'addService']);

});