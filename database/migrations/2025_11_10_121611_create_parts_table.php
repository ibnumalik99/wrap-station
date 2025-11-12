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
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');

            $table->enum('paint', ['G', 'F', 'P']);
            $table->text('note_paint')->nullable();
            $table->string('image_paint')->nullable();

            $table->enum('wind_shiel', ['G', 'F', 'P']);
            $table->text('note_wind_shiel')->nullable();
            $table->string('image_wind_shiel')->nullable();

            $table->enum('windows', ['G', 'F', 'P']);
            $table->text('note_windows')->nullable();
            $table->string('image_windows')->nullable();

            $table->enum('mirrors', ['G', 'F', 'P']);
            $table->text('note_mirrors')->nullable();
            $table->string('image_mirrors')->nullable();

            $table->enum('rear_windows', ['G', 'F', 'P']);
            $table->text('note_rear_windows')->nullable();
            $table->string('image_rear_windows')->nullable();

            $table->enum('tires', ['G', 'F', 'P']);
            $table->text('note_tires')->nullable();
            $table->string('image_tires')->nullable();

            $table->enum('wheels', ['G', 'F', 'P']);
            $table->text('note_wheels')->nullable();
            $table->string('image_wheels')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
