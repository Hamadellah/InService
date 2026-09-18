<?php
use App\Http\Controllers\api\CategoryController;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ProfileController;
use App\Http\Controllers\api\ServiceController;
use App\Http\Controllers\api\ServiceRequestController;
use App\Http\Controllers\api\TechnicienController;
use App\Http\Controllers\api\ClientController;
use App\Http\Controllers\api\MessageController;


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::delete('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::put('/profile',[ProfileController::class,'completeProfile'])->middleware('auth:sanctum');
Route::get('/services',[ServiceController::class,'showService']);
Route::middleware(['auth:sanctum','technicien'])->group(function(){
    Route::post('/addService',[ServiceController::class,'addService']);
    Route::put('/updateService/{id}',[ServiceController::class,'updateService']);
    Route::delete('/deleteService/{id}',[ServiceController::class,'deleteService']);
    route::get('/categories',[CategoryController::class,'show']);
    route::get('/servicesTechnicien',[ServiceController::class,'showServiceBytechnicien']);
    Route::get('/serviceRequests',[TechnicienController::class,'getserviceRequests']);
    Route::put('/updateServiceRequestStatus/{id}',[ServiceRequestController::class,'serviceRequestStatus']);
    Route::get('/getMessages',[MessageController::class,'getMessages']);
    Route::post('/postMessages/{id}',[MessageController::class,'postMessages']);

});
Route::middleware(['auth:sanctum','client'])->group(function(){
    Route::post('/makeServiceRequest/{serviceId}',[ServiceRequestController::class,'makeServiceRequest']);
    Route::delete('/deleteServiceRequest/{serviceId}',[ServiceRequestController::class,'deleteServiceRequest']);
    Route::get('/clientServiceRequests',[ClientController::class,'getServiceRequests']);
    Route::post('/sendMessage/{id}',[MessageController::class,'sendMessage']);
   
});
route::middleware(['auth:sanctum','admin'])->group(function(){
 
});