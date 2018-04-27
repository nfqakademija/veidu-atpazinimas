<?php

namespace App\DataFixtures;

use App\Entity\StudentGroup;
use App\Entity\Module;
use App\Entity\Student;
use App\Extensions\Extensions;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class GroupFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $modules = $manager->getRepository(Module::class)->findAll();

        for ($i = 0; $i < 10; $i++) {
            $group = new StudentGroup();
            $group->setTitle($faker->title);

            $module_count = $faker->randomElement(range(3, 7));
            for ($m = 0; $m < $module_count; $m++) {
                $module = $faker->randomElement($modules);
                $group->addModule($module);
            }

            $manager->persist($group);
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
        return 2;
    }
}