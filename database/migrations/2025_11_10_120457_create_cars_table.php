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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->string('brand', 100);
            $table->string('model', 100);
            $table->string('color', 50);
            $table->year('years');
            $table->string('license_plat', 20);
            $table->date('inspection_date');
            $table->integer('mileage'); // kilometer
            $table->string('right_view')->nullable();
            $table->string('left_view')->nullable();
            $table->string('front_view')->nullable();
            $table->string('back_view')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
