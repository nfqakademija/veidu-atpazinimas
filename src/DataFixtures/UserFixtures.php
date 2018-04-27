<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        for ($i = 0; $i < 100; $i++) {
            $user = new User();
            $user
                ->setName($faker->name)
                ->setEmail($faker->email)
                ->setPassword($faker->password(6, 20));
            $manager->persist($user);
        }

        $manager->flush();
    }
}