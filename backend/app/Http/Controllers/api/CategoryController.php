<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function show(){
     $categories = Category::get();
     return response()->json([
         'data' => $categories,
         "message" => "Catégories récupérées avec succès"
     ]);
    }
}
