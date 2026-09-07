<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'technicien_id',
        'title',
        'description',
        'price',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    // Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Technicien propriétaire du service
    public function technicien()
    {
        return $this->belongsTo(Technicien::class);
    }

    // Requests
    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class);
    }
}