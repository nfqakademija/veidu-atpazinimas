<?php

namespace App\DataFixtures;

use App\Entity\Lecturer;
use App\Entity\Module;
use App\Extensions\Extensions;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ModuleFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $lecturers = $manager->getRepository(Lecturer::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $module = new Module();
            $module
                ->setTitle($faker->name)
                ->setLecturer(Extensions::uniqueRandomElement($lecturers, $faker));

            $manager->persist($module);
        }

        $manager->flush();
    }
}