<?php

namespace App\DataFixtures;

use App\Entity\Lecturer;
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
            $user->setName($faker->name)
                ->setEmail($faker->email)
                ->setPassword($this->encoder->encodePassword($user, $faker->password(6, 20)));

            if ($faker->boolean(60)) {
                $lecturer = new Lecturer();
                $lecturer->setUser($user);

                $manager->persist($lecturer);
            }

            $manager->persist($user);
        }

        $manager->flush();
    }

    /**
     * Get the order of this fixture
     * @return integer
     */
    public function getOrder()
    {
        return 0;
    }
}