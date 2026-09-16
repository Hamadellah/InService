<?php

namespace App\Services;

use App\Models\Service;
use App\Models\User;

class ServiceService
{
    public function createService(array $data, User $user)
    {
        $technicien = $user->technicien;

        if (!$technicien) {
            return null;
        }

        return Service::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'price' => $data['price'],
            'category_id' => $data['category_id'],
            'technicien_id' => $technicien->id,
        ]);
    }
}