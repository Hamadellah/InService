<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Favorite;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    public function makeFavorite($id) {
        $user = auth()->user();
        $client = Client::where('user_id', $user->id)->first();

        if (!$client) {
            return response()->json([
                'message' => 'Profil client non trouvé.'
            ], 404);
        }

        $service = Service::findOrFail($id);
        $technicienId = $service->technicien_id;

        $dejaFavoris = Favorite::where('client_id', $client->id)
            ->where('technicien_id', $technicienId)
            ->first();

        if ($dejaFavoris) {
            $dejaFavoris->delete();

            return response()->json([
                'status' => 200,
                'is_favorite' => false,
                'message' => 'Technicien retiré des favoris'
            ], 200);
        }
        

        $favorite = Favorite::create([
            'client_id' => $client->id,
            'technicien_id' => $technicienId,
        ]);

        return response()->json([
            'status' => 201,
            'is_favorite' => true,
            'message' => 'Technicien ajouté aux favoris avec succès',
            'data' => $favorite
        ], 201);
    }
    public function getFavorites(){
        $user = auth()->user();
        $client = Client::where('user_id', $user->id)->first();
        
        if (!$client) {
            return response()->json([
                'message' => 'Profil client non trouvé.'
            ], 404);
        }
        $favorites = DB::select('
            SELECT 
                favorites.id AS favorite_id,
                techniciens.id AS technicien_id,
                users.name,
                users.email,
                users.phone,
                users.city,
                users.image
            FROM favorites 
            INNER JOIN techniciens ON favorites.technicien_id = techniciens.id
            INNER JOIN users ON techniciens.user_id = users.id
            WHERE favorites.client_id = ?
        ', [$client->id]);

        return response()->json([
            'status' => 200,
            'message' => 'Liste des techniciens favoris récupérée avec succès',
            'data' => $favorites
        ], 200);
    }
public function removeFavorite($technicienId)
{
    $user = auth()->user();

    $client = Client::where('user_id', $user->id)->first();

    if (!$client) {
        return response()->json([
            'status' => 404,
            'message' => 'Profil client non trouvé.'
        ], 404);
    }

    $favorite = Favorite::where('client_id', $client->id)
        ->where('technicien_id', $technicienId)
        ->first();

    if (!$favorite) {
        return response()->json([
            'status' => 404,
            'message' => 'Favori non trouvé.'
        ], 404);
    }

    $favorite->delete();

    return response()->json([
        'status' => 200,
        'message' => 'Favori supprimé avec succès.'
    ], 200);
}
};