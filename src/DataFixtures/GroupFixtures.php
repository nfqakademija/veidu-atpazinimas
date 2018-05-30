<?php

namespace App\DataFixtures;

use App\Entity\StudentGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class GroupFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        for ($i = 0; $i < 10; $i++) {
            $group = new StudentGroup();
            $group->setTitle($faker->word);

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
        return 1;
    }
}
