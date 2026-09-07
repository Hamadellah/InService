<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('techniciens', function (Blueprint $table) {
            $table->string('bio')->nullable()->default(null)->change();
            $table->integer('experience')->nullable()->default(null)->change();
            $table->decimal('price', 10, 2)->nullable()->default(null)->change();
            $table->decimal('average_rating', 3, 2)->nullable()->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('techniciens', function (Blueprint $table) {
            //
        });
    }
};
