<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ServiceService;
use App\Models\Service;
use Illuminate\Support\Facades\DB;
use App\Models\Technicien;
class ServiceController extends Controller
{
    public function __construct(
        private ServiceService $serviceService
    ) {}

    public function show()
    {
        $services = Service::get();

        return response()->json([
            'status' => 200,
            'services' => $services
        ]);
    }
   public function showService()
{
    $services = DB::select("
        SELECT 
            users.*,
            services.*,
            categories.name AS category_name,
            categories.icon AS category_icon,
            categories.image AS category_image
        FROM services

        INNER JOIN techniciens 
            ON techniciens.id = services.technicien_id

        INNER JOIN users 
            ON users.id = techniciens.user_id

        INNER JOIN categories 
            ON categories.id = services.category_id

        WHERE techniciens.availability = 1
    ");

    return response()->json([
        'status' => 200,
        'services' => $services
    ]);
}

    public function addService(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        $service = $this->serviceService->createService(
            $data,
            auth()->user()
        );

        if (!$service) {
            return response()->json([
                'status' => 404,
                'message' => 'Technicien introuvable'
            ], 404);
        }

        return response()->json([
            'status' => 201,
            'message' => 'Service créé avec succès',
            'service' => $service
        ], 201);
    }
    public function updateService(Request $request, $id){
        $service = Service::findOrFail($id);
        $data=$request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);
        $service->update($data);
        return response()->json([
            'status' => 200,
            'message' => 'Service modifié avec succès',
            'service' => $service
        ], 200);
    }
    public function deleteService($id){
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json([
            'status' => 200,
            'message' => 'service supprimé avec succés',
        ]);
    }
    public function showServiceByTechnicien()
{
    $userId = auth()->id();

    $technicien = Technicien::where('user_id', $userId)->first();

    if (!$technicien) {
        return response()->json([
            'status' => 404,
            'message' => 'Technicien non trouvé'
        ], 404);
    }

    $services = DB::select(" SELECT 
            users.*,
            services.*,
            categories.name AS category_name,
            categories.icon AS category_icon,
            categories.image AS category_image
        FROM services

        INNER JOIN techniciens 
            ON techniciens.id = services.technicien_id

        INNER JOIN users 
            ON users.id = techniciens.user_id

        INNER JOIN categories 
            ON categories.id = services.category_id

        WHERE  techniciens.id=?", [$technicien->id]);

    return response()->json([
        'status' => 200,
        'services' => $services
    ]);
}
}