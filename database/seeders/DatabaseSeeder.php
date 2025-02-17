<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Schedule;
use App\Models\Ticket;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $categories = Category::factory(20)->create();

        Schedule::factory(20)
            ->has(
                Ticket::factory()
                    ->count(10)
                    ->sequence(fn (Sequence $sequence) => [
                        'queue' => $sequence->index,
                    ]),
                'tickets'
            )
            ->create([
                'category_id' => $categories->random()->id,
            ]);

        User::factory()->create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@quick-turns.com',
        ]);
    }
}
