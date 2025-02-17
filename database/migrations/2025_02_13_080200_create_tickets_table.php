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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('schedule_id')->constrained('schedules')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('handled_by')->nullable()->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('ticket_number')->unique();
            $table->unsignedInteger('queue');
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('description')->nullable();
            $table->text('note')->nullable();
            $table->enum('status', ['CANCELED', 'PENDING', 'OPEN', 'TAKEN', 'CLOSED'])->default('OPEN');
            $table->dateTime('taken_at')->nullable();
            $table->dateTime('closed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
