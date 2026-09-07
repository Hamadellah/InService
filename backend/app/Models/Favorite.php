<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'technicien_id',
    ];

    // Client
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Technicien
    public function technicien()
    {
        return $this->belongsTo(Technicien::class);
    }
}