<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = \App\Models\Product::class;

    public function definition(): array
    {
        return [
            'name'        => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'price'       => $this->faker->randomFloat(2, 10, 500),
            'status'      => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
