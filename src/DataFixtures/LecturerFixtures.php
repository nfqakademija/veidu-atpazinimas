<?php

namespace App\DataFixtures;

use App\Entity\Lecturer;
use App\Entity\Module;
use App\Entity\User;
use App\Extensions\Extensions;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class LecturerFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $users = $manager->getRepository(User::class)->findAll();
        $modules = $manager->getRepository(Module::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $lecturer = new Lecturer();

            $lecturer->setUser(Extensions::uniqueRandomElement($users, $faker));

            $module_count = $faker->randomElement(range(0, 4));
            for ($i = 0; $i < $module_count; $i++) {
                if (($module = Extensions::uniqueRandomElement($modules, $faker)) === null)
                    break;

                $lecturer->addModule($module);
            }
            $manager->persist($lecturer);
        }
        $manager->flush();
    }

}