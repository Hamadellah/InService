<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
 public function show(){
    $services = Service::get();
    return response()->json([
        'status' => 200,
        'services' => $services
    ]);
 }
 public function addService(Request $request){
    $user = auth()->user();
    $request->validate([
        "name" => 'required|string|max:255',
        "description" => 'required|string|max:255',
        "price" => 'required|numeric|min:0',
        "category_id" => 'required|exists:categories,id'
    ]);
    $request->merge(['user_id' => $user->id]);
    $service = Service::create($request->all());
    return response()->json([
        'status' => 201,
        'service' => $service
    ]);
 }

}
