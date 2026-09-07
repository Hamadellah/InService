<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_request_id',
        'client_id',
        'technicien_id',
        'comment',
        'rating',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
    ];

    // Service Request
    public function serviceRequest()
    {
        return $this->belongsTo(ServiceRequest::class);
    }

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