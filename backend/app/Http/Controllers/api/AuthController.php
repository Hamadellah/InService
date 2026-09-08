<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Client;
use App\Models\Technicien;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,client,technicien',
            'city' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'city' => $request->city,
            'phone' => $request->phone,
            'image' => $request->image,
        ]);
        if($request->role === 'client'){
            Client::create([
                'user_id' => $user->id,
                'address' => $request->address,
            ]);
        }
        if($request->role === 'technicien'){
            Technicien::create([
                'user_id' => $user->id,
                "bio"=>null,
                "experience"=>null,
                "price"=>null,
                "availability"=>true,
                "average_rating"=>null,
                'address' => $request->address,
            ]);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user->load([
                'client',
                'technicien'
            ]),
            "token" => $token
        ], 201);
    }

   public function login(Request $request){
    $user = User::where('email', $request->email)->first();
    if(!$user || !Auth::attempt($request->only('email', 'password'))){
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }
    $token = $user->createToken('auth_token')->plainTextToken;
    return response()->json([
        'message' => 'Login successful',
        "user" => $user->load([
            'client',
            'technicien'
        ]),
        "token" => $token
    ], 200);
   } 
   public function logout(Request $request){
    $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'logout successfully'
        ], 200);
   }
}
