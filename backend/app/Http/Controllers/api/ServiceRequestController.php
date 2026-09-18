<?php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Technicien;
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
   public function deleteServiceRequest($id)
{
    $user = auth()->user();

    // 1. N-jibo l-client w-n-vérifiw wash kayn
    $client = Client::where('user_id', $user->id)->first();

    if (!$client) {
        return response()->json([
            'message' => 'Profil client non trouvé.'
        ], 404);
    }

    // 2. N-qellbo 3la l-demande b-l-ID dyal l-demande NISHAN (ou b-l-service_id)
    $serviceRequest = ServiceRequest::where('client_id', $client->id)
        ->where(function ($query) use ($id) {
            $query->where('id', $id)
                  ->orWhere('service_id', $id);
        })
        ->first();

    if (!$serviceRequest) {
        return response()->json([
            'message' => 'Demande de service non trouvée'
        ], 404);
    }

    $serviceRequest->delete();

    return response()->json([
        'message' => 'Demande de service supprimée avec succès'
    ], 200);
}
public function serviceRequestStatus($id, Request $request)
{
   $request->validate([
    'status' => "required|string"
   ]);
   $servicerequest = ServiceRequest::find($id);
   $technicien = Technicien::find($servicerequest->technicien_id);
   $servicerequest->update([
    'status' => $request->status
   ]);
   if($request->status === 'in_progress'){
    $technicien->update([
        'availability' => false
    ]);
   }
   if($request->status === 'completed'){
    $technicien->update([
        'availability' => true
    ]);
   }
   return response()->json([
    'status' => 200,
    'message' => 'Status updated successfully',
    'data' => $servicerequest
   ]);


}
};