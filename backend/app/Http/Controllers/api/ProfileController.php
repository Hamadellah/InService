<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class ProfileController extends Controller
{
   public function completeProfile(Request $request){
    $user = $request->user();
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
            'average_rating' => $request->average_rating,
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
}
