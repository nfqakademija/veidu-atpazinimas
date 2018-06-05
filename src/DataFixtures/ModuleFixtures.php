<?php

namespace App\DataFixtures;

use App\Entity\Attendance;
use App\Entity\Lecture;
use App\Entity\Module;
use App\Entity\Student;
use App\Entity\StudentGroup;
use App\Entity\Teacher;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ModuleFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        $teachers = $manager->getRepository(Teacher::class)->findAll();
        $groups = $manager->getRepository(StudentGroup::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $module = new Module();
            $module
                ->setTitle($faker->word)
                ->setTeacher($faker->randomElement($teachers));

            for ($m = 0; $m < $faker->randomElement(range(1, 4)); $m++) {
                $group = $faker->randomElement($groups);
                $module->addGroup($group);
            }

            for ($l = 0; $l < 20; $l++) {
                $lecture = new Lecture();

                $start = $faker->dateTime();
                $end = (clone $start)->add(new \DateInterval('PT45M'));
                $lecture
                    ->setTitle('Paskaita #' . $i)
                    ->setStart($start)
                    ->setEnd($end);

                if ($faker->boolean(70)) {
                    foreach ($module->getGroups() as $group) {
                        foreach ($group->getStudents() as $student) {
                            $attendance = new Attendance();
                            $attendance
                                ->setLecture($lecture)
                                ->setStudent($student)
                                ->setAttended($faker->boolean(90));

                            $manager->persist($attendance);
                        }
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
