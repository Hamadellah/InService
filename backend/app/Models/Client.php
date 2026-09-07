<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address',
    ];

    // User account
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Service requests
    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class);
    }

    // Favorites
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // Reviews
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Techniciens favoris
    public function favoriteTechniciens()
    {
        return $this->belongsToMany(
            Technicien::class,
            'favorites'
        )->withTimestamps();
    }
}