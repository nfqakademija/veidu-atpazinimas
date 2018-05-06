<?php

namespace App\DataFixtures;

use App\Entity\Attendance;
use App\Entity\Lecture;
use App\Entity\Lecturer;
use App\Entity\Module;
use App\Entity\StudentGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ModuleFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $lecturers = $manager->getRepository(Lecturer::class)->findAll();
        $groups = $manager->getRepository(StudentGroup::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $module = new Module();
            $module->setTitle($faker->word)
                ->setLecturer($faker->randomElement($lecturers));

            for ($m = 0; $m < $faker->randomElement(range(1, 4)); $m++) {
                $group = $faker->randomElement($groups);
                $module->addGroup($group);
            }

            for ($l = 0; $l < 20; $l++) {
                $lecture = new Lecture();

                $start = $faker->dateTime();
                $end = (clone $start)->add(new \DateInterval('PT45M'));
                $lecture->setTitle($faker->text(50))
                    ->setStart($start)
                    ->setEnd($end);

                foreach ($module->getGroups() as $group) {
                    foreach ($group->getStudents() as $student) {
                        $attendance = new Attendance();
                        $attendance->setLecture($lecture)
                            ->setStudent($student)
                            ->setAttended($faker->boolean(90));

                        $manager->persist($attendance);
                    }
                }


                $manager->persist($lecture);
                $module->addLecture($lecture);
            }

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
        return 3;
    }
}