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
    public function sendMessage($id,Request $request){
        $user = auth()->user();
        $clientId = Client::where('user_id', $user->id)->first();
        $service = ServiceRequest::find($id);
        $technicien = Technicien::find($service->technicien_id);
        $request->validate([
            'message' => 'required|string',
        ]);
        $message = Message::create([
            'receiver_id' => $technicien->id,
            'sender_id' => $clientId->id,
            'message' => $request->message,
            'is_read' => false,
        ]);
        return response()->json($message, 201);
    }
    public function getMessages(){
        $user = auth()->user();
        $technicien = Technicien::where('user_id', $user->id)->first();
        $messages =DB::select('SELECT messages.* , users.name,users.image from messages
INNER JOIN clients on messages.sender_id=clients.id
INNER JOIN users on clients.user_id = users.id
WHERE messages.receiver_id=? OR messages.sender_id=? ORDER BY messages.created_at DESC', [$technicien->id,$technicien->id]);
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
