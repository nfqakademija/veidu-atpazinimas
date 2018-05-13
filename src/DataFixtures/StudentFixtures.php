<?php

namespace App\DataFixtures;

use App\Entity\Student;
use App\Entity\StudentGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class StudentFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $groups = $manager->getRepository(StudentGroup::class)->findAll();

        for ($i = 0; $i < 200; $i++) {
            $student = new Student();
            $student
                ->setName($faker->name)
                ->setGroup($faker->randomElement($groups))
            ;

            $manager->persist($student);
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