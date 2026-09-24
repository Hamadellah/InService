<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Message;
use App\Models\ServiceRequest;
use App\Models\Technicien;
use Illuminate\Support\Facades\DB;
class MessageController extends Controller
{
public function sendMessage($id, Request $request)
{
    try {
        $user = auth()->user();

        $request->validate([
            'message' => 'required|string',
        ]);

        $service = ServiceRequest::findOrFail($id);

        if (!$service->technicien_id) {
            return response()->json(['message' => 'Aucun technicien assigné à ce service'], 400);
        }

        $technicien = Technicien::findOrFail($service->technicien_id);

        $client = Client::where('user_id', $user->id)->first();

        if (!$client) {
            return response()->json(['message' => 'Seul un client peut envoyer ce message'], 403);
        }

        $message = Message::create([
            'sender_id'   => $user->id,             
            'receiver_id' => $technicien->user_id,  
            'message'     => $request->message,
            'is_read'     => false,
        ]);

        return response()->json($message, 201);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Erreur Serveur',
            'details' => $e->getMessage()
        ], 500);
    }
}
  public function getMessages()
{
    $user = auth()->user();

  
    $technicien = Technicien::where('user_id', $user->id)->first();
    
    $techId = $technicien ? $technicien->id : null;

    
    $messages = DB::table('messages')
        ->leftJoin('users as senders', 'messages.sender_id', '=', 'senders.id')
        ->leftJoin('users as receivers', 'messages.receiver_id', '=', 'receivers.id')
        ->select(
            'messages.*',
            'senders.name as sender_name',
            'senders.image as sender_image',
            'senders.phone as sender_phone',
            'senders.email as sender_email',
            'senders.city as sender_city',
            'receivers.name as receiver_name',
            'receivers.image as receiver_image'
        )
      
        ->where(function($query) use ($user, $techId) {
            $query->where('messages.receiver_id', $user->id)
                  ->orWhere('messages.sender_id', $user->id);
            
            if ($techId) {
                $query->orWhere('messages.receiver_id', $techId)
                      ->orWhere('messages.sender_id', $techId);
            }
        })
        ->orderBy('messages.created_at', 'DESC')
        ->get();

    return response()->json($messages, 200);
}
    public function postMessages($id,Request $request){
        $user = auth()->user();
        $technicien = Technicien::where('user_id', $user->id)->first();
        $client = Client::find($id);
        $request->validate([
            'message' => 'required|string',
        ]);
        $message = Message::create([
            'receiver_id' => $client->id,
            'sender_id' => $technicien->id,
            'message' => $request->message,
            'is_read' => false,
        ]);
        return response()->json($message, 201);
    }
}
