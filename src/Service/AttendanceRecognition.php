<?php

namespace App\Service;

use App\Entity\Attendance;
use App\Entity\Lecture;
use App\Entity\Student;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManager;
use GuzzleHttp\Exception\ClientException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;

class AttendanceRecognition
{
    /** @var FaceRecognition */
    private $recognition;

    /** @var EntityManager */
    private $em;

    /** @var DataUriNormalizer */
    private $normalizer;

    /** @var Filesystem */
    private $fs;

    /**
     * AttendanceGenerator constructor.
     * @param FaceRecognition $recognition
     * @param EntityManager $entityManager
     */
    public function __construct(FaceRecognition $recognition, EntityManager $entityManager)
    {
        $this->recognition = $recognition;
        $this->em = $entityManager;
        $this->normalizer = new DataUriNormalizer();
        $this->fs = new Filesystem();
    }

    /**
     * @param Lecture $lecture
     * @param string $image
     * @return Collection|Attendance[]
     * @throws \Doctrine\ORM\ORMException
     * @throws \Exception
     */
    public function checkAttendances($lecture, $image)
    {
        $students = $this->em->getRepository(Student::class)->findInLecture($lecture);
        $students = new ArrayCollection($students);

        $studentsWithEncodings = $students->filter(function (Student $student) {
            return $student->hasEncoding();
        });

        $faceEncodings = array_map(function (Student $student) {
            return $student->getEncoding();
        }, $studentsWithEncodings->getValues());

        try {
            $result = $this->recognition->recognizeFaces($faceEncodings, $image);
        } catch (ClientException $e) {
            throw new \Exception($e->getMessage());
        }

        $attendancePairs = array_combine($studentsWithEncodings->getKeys(), $result['recognized']);

        $knownAttendances = $this->generateAttendances($lecture, $students, $attendancePairs);
        $unknownAttendances = $this->generateUnknownAttendances($lecture, $result['unknown']);

        return new ArrayCollection(array_merge(
            $knownAttendances->toArray(),
            $unknownAttendances->toArray()
        ));
    }

    /**
     * @param Lecture $lecture
     * @param Collection|Student[] $students
     * @param array|bool $compared
     *
     * @return Collection|Attendance[]
     * @throws \Doctrine\ORM\ORMException
     */
    private function generateAttendances($lecture, $students, $compared)
    {
        $attendances = new ArrayCollection();
        foreach ($compared as $id => $hasAttended) {
            $attendance = new Attendance();
            $attendance
                ->setStudent($students[$id])
                ->setAttended($hasAttended)
                ->setLecture($lecture);

            $this->em->persist($attendance);

            $attendances->add($attendance);
        }

        return $attendances;
    }

    /**
     * @param $lecture
     * @param Collection $unknownStudents
     * @return Collection|Attendance[]
     * @throws \Doctrine\ORM\ORMException
     */
    private function generateUnknownAttendances($lecture, $unknownStudents)
    {
        $attendances = new ArrayCollection();
        foreach ($unknownStudents as $student) {
            /** @var File $image */
            $image = $this->normalizer->normalize(
                $student['face'],
                'Symfony\Component\HttpFoundation\File\File'
            );

            $fileName = uniqid() . '.png';
            $this->fs->dumpFile('tmp/' . $fileName, file_get_contents($image));
            $file = new UploadedFile('tmp/', $fileName);

            $student = new Student();
            $student
                ->setFace($file)
                ->setEncoding($student['encoding'])
                ->setShadow(true);

            $this->em->persist($student);

            $attendance = new Attendance();
            $attendance
                ->setStudent($student)
                ->setAttended(true)
                ->setLecture($lecture);

            $this->em->persist($attendance);

            $attendances->add($attendance);
        }

        return $attendances;
    }
}
