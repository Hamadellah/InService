<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Plomberie & Sanitaire',
                'icon' => 'Wrench',
                'image' => 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Électricité & Éclairage',
                'icon' => 'Zap',
                'image' => 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Climatisation & Chauffage',
                'icon' => 'Thermometer',
                'image' => 'https://images.unsplash.com/photo-1631545806609-8e2a748c9c2f?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Peinture & Décoration',
                'icon' => 'Paintbrush',
                'image' => 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Menuiserie & Boiserie',
                'icon' => 'Hammer',
                'image' => 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Serrurerie & Sécurité',
                'icon' => 'Key',
                'image' => 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Maçonnerie & Rénovation',
                'icon' => 'Building',
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Réparation Électroménager',
                'icon' => 'Tv',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Informatique & Réseaux',
                'icon' => 'Monitor',
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Jardinage & Extérieur',
                'icon' => 'Scissors',
                'image' => 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Nettoyage & Entretien',
                'icon' => 'Sparkles',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Déménagement & Transport',
                'icon' => 'Truck',
                'image' => 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Sécurité & Alarme',
                'icon' => 'Shield',
                'image' => 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'name' => 'Mécanique & Auto-Moto',
                'icon' => 'Car',
                'image' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->updateOrInsert(
                [
                    'name' => $category['name'],
                ],
                [
                    'icon' => $category['icon'],
                    'image' => $category['image'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}