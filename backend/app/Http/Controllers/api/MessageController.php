<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Message;
use App\Models\ServiceRequest;
use App\Models\Technicien;

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
        $clientId = Client::where('user_id', $user->id)->first();
        $messages = Message::where('receiver_id', $clientId->id)
            ->orWhere('sender_id', $clientId->id)
            ->get();
        return response()->json($messages, 200);
    }
}
