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
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->timestamps('created_at');
            $table->enum('role', ['admin', 'organizer','attendee']);
            $table->string('location');
            $table->string('photo');
            $table->foreignId('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile');
    }
};
