<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function getServiceRequests()
    {
        $user = auth()->user();
        
        $clientId = Client::where('user_id', $user->id)->first();

        if (!$clientId) {
            return response()->json([
                'status' => 404,
                'message' => 'Client non trouvé',
                'data' => []
            ], 404);
        }

        // Query explicit b-smīyat l-tables bāsh ma-y-wqe3sh overlap f-l-IDs
        $serviceRequests = DB::select('
            SELECT 
                service_requests.id AS id,
                service_requests.status,
                service_requests.description,
                service_requests.request_date,
                service_requests.scheduled_date,
                users.name,
                users.email,
                users.phone,
                users.city,
                users.image
            FROM service_requests 
            INNER JOIN techniciens ON service_requests.technicien_id = techniciens.id
            INNER JOIN users ON techniciens.user_id = users.id
            WHERE service_requests.client_id = ?
        ', [$clientId->id]);

        return response()->json([
            'status' => 200,
            'message' => 'Service requests retrieved successfully',
            'data' => $serviceRequests
        ], 200);
    }
}