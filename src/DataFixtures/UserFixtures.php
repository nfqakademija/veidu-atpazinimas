<?php

namespace App\DataFixtures;

use App\Entity\Attendance;
use App\Entity\Lecture;
use App\Entity\Module;
use App\Entity\Student;
use App\Entity\StudentGroup;
use App\Entity\Teacher;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture implements OrderedFixtureInterface
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('lt_LT');

        for ($i = 0; $i < 50; $i++) {
            $user = new User();
            $user
                ->setUsername($faker->email)
                ->setEmail($faker->email)
                ->setPassword(
                    $this->encoder->encodePassword($user, $faker->password(6, 20))
                );

            $teacher = new Teacher();
            $teacher
                ->setName($faker->name)
                ->setUser($user);
            if ($i === 0) {
                $later = $teacher;
            }

            $manager->persist($teacher);

            $manager->persist($user);
        }

        $array = [
            'Linas',
            'Monika',
            'Liudas'
        ];

        $group = new StudentGroup();
        $group->setTitle('NFQ Kaunas');

        $manager->persist($group);

        $module = new Module();
        $module
            ->setTitle('NFQ')
            ->setTeacher($later);

        $manager->persist($module);

        $students = [];
        foreach ($array as $item) {
            $student = new Student();
            $student
                ->setName($item)
                ->setGroup($group)
                ->setFace($item . '.png');

            $student[] = $student;
            $manager->persist($student);
        }

        $lecture = new Lecture();
        $lecture->setTitle('Kodo patikra')
            ->setStart(new \DateTime('2018-06-01T17:00Z'))
            ->setEnd(new \DateTime('2018-06-01T19:00Z'))
            ->setModule($module);

        $manager->persist($lecture);

        $lecture = new Lecture();
        $lecture->setTitle('Pristatymas')
            ->setStart(new \DateTime('2018-06-05T17:00Z'))
            ->setEnd(new \DateTime('2018-06-05T19:00Z'))
            ->setModule($module);

        $attendances = [];
        foreach ($students as $student) {
            $attendance = new Attendance();
            $attendance
                ->setLecture($lecture)
                ->setStudent($student);

            $attendances[] = $attendance;
        }
        $lecture->setAttendances($attendances);

        $manager->persist($lecture);

        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 0;
    }
}
