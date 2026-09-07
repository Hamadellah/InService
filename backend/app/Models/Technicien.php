<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technicien extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'experience',
        'price',
        'availability',
        'average_rating',
    ];

    protected $casts = [
        'availability' => 'boolean',
        'price' => 'decimal:2',
        'average_rating' => 'decimal:2',
    ];

    // User account
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Services proposés
    public function services()
    {
        return $this->hasMany(Service::class);
    }

    // Service requests
    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class);
    }

    // Reviews reçues
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Favorites
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // Clients qui ont ajouté ce technicien en favori
    public function favoriteClients()
    {
        return $this->belongsToMany(
            Client::class,
            'favorites'
        )->withTimestamps();
    }
}