<?php

namespace Database\Factories;

use App\Enums\TicketStatus;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->faker->dateTimeBetween('-1 years', '+7 days');
        $takenAt = Date::parse($createdAt)->addMinutes($this->faker->numberBetween(5, 120))->format('Y-m-d H:i:s');
        $closedAt = Date::parse($takenAt)->addMinutes($this->faker->numberBetween(5, 120))->format('Y-m-d H:i:s');

        return [
            'schedule_id' => Schedule::factory(),
            'handled_by' => Schedule::factory(),
            'ticket_number' => 'TIC-' . $createdAt->format('ymd') . '-' . $this->faker->unique()->randomNumber(4),
            'queue' => $this->faker->randomNumber(),
            'name' => $this->faker->name(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'status' => $this->faker->randomElement(TicketStatus::cases()),
            'description' => $this->faker->sentence(),
            'note' => $this->faker->sentence(),
            'taken_at' => $takenAt,
            'closed_at' => $closedAt,
            'created_at' => $createdAt,
        ];
    }
}
