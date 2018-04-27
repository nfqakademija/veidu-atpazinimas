<?php

namespace App\Extensions;

class Extensions
{
    public static function uniqueRandomElement(array &$array, \Faker\Generator $faker)
    {
        $randomElement = $faker->randomElement($array);
        $array = array_diff($array, $randomElement);
        return $randomElement;
    }
}