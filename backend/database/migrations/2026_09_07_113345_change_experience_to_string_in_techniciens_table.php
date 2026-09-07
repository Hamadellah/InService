<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('techniciens', function (Blueprint $table) {
            // Changer en string avec une longueur
            $table->string('experience', 255)->nullable()->change();
            
            // Ou en text pour plus de flexibilité
            // $table->text('experience')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('techniciens', function (Blueprint $table) {
            // Revenir au type précédent (supposons que c'était integer)
            $table->integer('experience')->nullable()->change();
        });
    }
};