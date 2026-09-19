<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Client;

class ProfileController extends Controller
{
   public function completeProfile(Request $request){
    $user = auth()->user();
    if($user->role === 'client'){
        $client = $user->client;
        $client->update([
            'address' => $request->address,
        ]);
        return response()->json([
            'message' => 'Client profile retrieved successfully',
            'profile' => $client
        ], 200);
    } elseif($user->role === 'technicien'){
        $technicien = $user->technicien;
        $technicien->update([
            'bio' => $request->bio,
            'experience' => $request->experience,
            'price' => $request->price,
            'availability' => $request->availability,
        ]);
        return response()->json([
            'message' => 'Technicien profile retrieved successfully',
            'profile' => $technicien
        ], 200);
    } else {
        return response()->json([
            'message' => 'User role not recognized'
        ], 400);
    }
   }
   public function getProfile(){
    $user = auth()->user();
    if($user->role === 'client'){
        $client = User::where("id",$user->id)->with('client')->first();
        return response()->json([
            'message' => 'Client profile retrieved successfully',
            'profile' => $client
        ], 200);
    } elseif($user->role === 'technicien'){
        $technicien =User::where("id",$user->id)->with('technicien')->first();
        return response()->json([
            'message' => 'Technicien profile retrieved successfully',
            'profile' => $technicien
        ], 200);
    } else {
        return response()->json([
            'message' => 'User role not recognized'
        ], 400);
    }
   }
}
