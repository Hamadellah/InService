<?php

namespace App\Services;

use App\Models\Client;
use App\Models\Service;
use App\Models\ServiceRequest;

class ServiceRequestService
{
    public function createRequest($serviceId, array $data, $user)
    {

        $client = Client::where('user_id', $user->id)->first();
        if (!$client) {
            return ['error' => "Votre compte n'est pas enregistré comme client.", 'code' => 404];
        }


        $service = Service::find($serviceId);
        if (!$service) {
            return ['error' => "Le service demandé n'existe pas.", 'code' => 404];
        }


        $serviceRequest = ServiceRequest::create([
            'request_date'   => now(),
            'client_id'      => $client->id,
            'service_id'     => $service->id,
            'technicien_id'  => $service->technicien_id,
            'description'    => $data['description'],
            'scheduled_date' => $data['scheduled_date'],
            'status'         => 'pending',
        ]);

        return ['data' => $serviceRequest, 'code' => 201];
    }
}