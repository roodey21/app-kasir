<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $image_path = 'product/pizza.jpg';

        return [
            'name' => $this->faker->words(2, true),
            'category_id' => Category::inRandomOrder()->first()->id,
            'price' => $this->faker->numberBetween(1, 50) * 1000,
            'image' => $image_path
        ];
    }
}
