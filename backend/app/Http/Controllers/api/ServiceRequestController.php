<?php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Services\ServiceRequestService;
use App\Models\ServiceRequest;
use App\Models\Client;

class ServiceRequestController extends Controller
{
    protected $service;

    public function __construct(ServiceRequestService $service)
    {
        $this->service = $service;
    }

    public function makeServiceRequest($serviceId, Request $request)
    {
 
        $request->validate([
            'description'    => 'required|string',
            'scheduled_date' => 'required|date',
        ]);

        $result = $this->service->createRequest($serviceId, $request->all(), auth()->user());




        return response()->json([
            'status'  => 201,
            'message' => 'Demande créée avec succès',
            'data'    => $result['data']
        ], 201);
    }
    public function deleteServiceRequest($serviceId)
    {
        $user = auth()->user();
        $client = Client::where('user_id', $user->id)->first();
        $service = $serviceId;
        $serviceRequest = ServiceRequest::where('client_id', $client->id)
            ->where('service_id', $service)
            ->first();


        if (!$serviceRequest) {
            return response()->json(['error' => 'Demande de service non trouvée'], 404);
        }

        $serviceRequest->delete();

        return response()->json(['message' => 'Demande de service supprimée avec succès'], 200);
    }
}