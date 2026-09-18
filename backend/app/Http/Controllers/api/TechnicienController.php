<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Technicien;

use Illuminate\Support\Facades\DB;

class TechnicienController extends Controller
{
    public function getserviceRequests(){
        $user = auth()->user()->id;
        $technicienId = Technicien::where('user_id',$user)->first();
        $serviceRequests =DB::select('SELECT users.* , service_requests.* 
from service_requests 
INNER JOIN clients ON client_id = clients.id
INNER JOIN users ON user_id = users.id
WHERE technicien_id=?', [$technicienId->id]);
        return response()->json([
            'status' => 200,
            'message' => 'Service requests retrieved successfully',
            'data' => $serviceRequests
        ], 200);
    }
}
