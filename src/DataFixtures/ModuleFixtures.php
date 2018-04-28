<?php

namespace App\DataFixtures;

use App\Entity\Lecturer;
use App\Entity\Module;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ModuleFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $lecturers = $manager->getRepository(Lecturer::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $module = new Module();
            $module
                ->setTitle($faker->word)
                ->setLecturer($faker->randomElement($lecturers));

            $manager->persist($module);
        }

        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 1;
    }
}