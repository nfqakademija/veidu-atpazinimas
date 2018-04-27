<?php

namespace App\DataFixtures;

use App\Entity\Group;
use App\Entity\Module;
use App\Entity\Student;
use App\Extensions\Extensions;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class GroupFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $modules = $manager->getRepository(Module::class)->findAll();
        $students = $manager->getRepository(Student::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $group = new Group();
            $group
                ->setTitle($faker->name);

            $module_count = $faker->randomElement(range(0, 7));
            for ($i = 0; $i < $module_count; $i++) {
                if (($module = Extensions::uniqueRandomElement($modules, $faker)) === null)
                    break;

                $group->addModule($module);
            }

            $student_count = $faker->randomElement(range(5, 30));
            for ($i = 0; $i < $student_count; $i++) {
                if (($student = Extensions::uniqueRandomElement($students, $faker)) === null)
                    break;

                $group->addStudent($student);
            }
            $manager->persist($group);
        }

        $manager->flush();
    }
}