<?php

namespace App\Repository;

use App\Entity\Lecture;
use App\Entity\Teacher;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Lecture|null find($id, $lockMode = null, $lockVersion = null)
 * @method Lecture|null findOneBy(array $criteria, array $orderBy = null)
 * @method Lecture[]    findAll()
 * @method Lecture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LectureRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Lecture::class);
    }


    public function findByTeacher(Teacher $teacher, int $limit = 1)
    {
        return $this->createQueryBuilder('l')
            ->join('l.module', 'm')
            ->join('m.teacher', 't')
            ->where('t.id = :teacher')
            ->orderBy('l.start', 'DESC')
            ->setMaxResults($limit)
            ->setParameter('teacher', $teacher)
            ->getQuery()
            ->execute()
        ;
    }
    
//    /**
//     * @return Lecture[] Returns an array of Lecture objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Lecture
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
