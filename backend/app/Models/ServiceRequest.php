<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'service_id',
        'technicien_id',
        'description',
        'status',
        'request_date',
        'scheduled_date',
    ];

    protected $casts = [
        'request_date' => 'date',
        'scheduled_date' => 'date',
    ];

    // Client
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Service demandé
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    // Technicien assigné
    public function technicien()
    {
        return $this->belongsTo(Technicien::class);
    }

    // Review
    public function review()
    {
        return $this->hasOne(Review::class);
    }
}