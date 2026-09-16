<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Technicien;
use Illuminate\Http\Request;
use App\Models\ServiceRequest;

class TechnicienController extends Controller
{
    public function getserviceRequests(){
        $user = auth()->user()->id;
        $technicienId = Technicien::where('user_id',$user)->first();
        $serviceRequests = ServiceRequest::where('technicien_id', $technicienId->id)->get();
        return response()->json([
            'status' => 200,
            'message' => 'Service requests retrieved successfully',
            'data' => $serviceRequests
        ], 200);
    }
}
