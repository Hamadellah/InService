<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Plomberie & Sanitaire',
                'icon' => 'Wrench',
            ],
            [
                'name' => 'Électricité & Éclairage',
                'icon' => 'Zap',
            ],
            [
                'name' => 'Climatisation & Chauffage',
                'icon' => 'Thermometer',
            ],
            [
                'name' => 'Peinture & Décoration',
                'icon' => 'Paintbrush',
            ],
            [
                'name' => 'Menuiserie & Boiserie',
                'icon' => 'Hammer',
            ],
            [
                'name' => 'Serrurerie & Sécurité',
                'icon' => 'Key',
            ],
            [
                'name' => 'Maçonnerie & Rénovation',
                'icon' => 'Building',
            ],
            [
                'name' => 'Réparation Électroménager',
                'icon' => 'Tv',
            ],
            [
                'name' => 'Informatique & Réseaux',
                'icon' => 'Monitor',
            ],
            [
                'name' => 'Jardinage & Extérieur',
                'icon' => 'Scissors',
            ],
            [
                'name' => 'Nettoyage & Entretien',
                'icon' => 'Sparkles',
            ],
            [
                'name' => 'Déménagement & Transport',
                'icon' => 'Truck',
            ],
            [
                'name' => 'Sécurité & Alarme',
                'icon' => 'Shield',
            ],
            [
                'name' => 'Mécanique & Auto-Moto',
                'icon' => 'Car',
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name'       => $category['name'],
                'icon'       => $category['icon'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}