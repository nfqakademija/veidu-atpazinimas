<?php

namespace App\DataFixtures;

use App\Entity\Student;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class StudentFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        for ($i = 0; $i < 20; $i++) {
            $student = new Student();
            $student
                ->setName($faker->name);
            $manager->persist($student);
        }

        $manager->flush();
    }
}