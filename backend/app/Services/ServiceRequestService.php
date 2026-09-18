<?php

namespace App\Services;

use App\Models\Client;
use App\Models\Service;
use App\Models\ServiceRequest;
use App\Models\Technicien;

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
        $technicien=Technicien::find($service->technicien_id);
        if(!$technicien){
            return ['error' => "Le technicien associé à ce service n'existe pas.", 'code' => 404];
        }
        if(isset($technicien->availability) && $technicien->availability === false){
            return ['error' => "Le technicien associé à ce service n'est pas disponible pour le moment.", 'code' => 400];
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