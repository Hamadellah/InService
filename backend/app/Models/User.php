<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'city',
        'image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    // Admin profile
    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    // Client profile
    public function client()
    {
        return $this->hasOne(Client::class);
    }

    // Technicien profile
    public function technicien()
    {
        return $this->hasOne(Technicien::class);
    }

    // Notifications
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    // Messages envoyés
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    // Messages reçus
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }
}