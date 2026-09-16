<?php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ServiceRequestService;

class ServiceRequestController extends Controller
{
    protected $service;

    public function __construct(ServiceRequestService $service)
    {
        $this->service = $service;
    }

    public function makeServiceRequest($id, Request $request)
    {
 
        $request->validate([
            'description'    => 'required|string',
            'scheduled_date' => 'required|date',
        ]);

        $result = $this->service->createRequest($id, $request->all(), auth()->user());




        return response()->json([
            'status'  => 201,
            'message' => 'Demande créée avec succès',
            'data'    => $result['data']
        ], 201);
    }
}