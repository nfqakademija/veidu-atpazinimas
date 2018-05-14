<?php

namespace App\Controller;

use App\Entity\Attendance;
use App\Entity\Lecture;
use App\Entity\Student;
use App\Entity\Teacher;
use App\Form\LectureType;
use App\Service\FaceRecognition;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class LectureController extends Controller
{
    public function index(NormalizerInterface $normalizer)
    {
        $entityManager = $this->getDoctrine()->getManager();
        // TODO: Get authenticated user

        /** @var Collection|Teacher $modules */
        // $teacher = $entityManager->getRepository(User::class)->find(10)
        //     ->getTeacher()
        // ;
        $teacher = $entityManager->getRepository(Teacher::class)->findOneBy([]);

        $lectures = $entityManager->getRepository(Lecture::class)->findByTeacher($teacher, 10);

        return $this->json($normalizer->normalize($lectures, null,
            ['groups' => ['index', 'time', 'module', 'count']]
        ));
    }

    public function show(Lecture $lecture, NormalizerInterface $normalizer): Response
    {
        return $this->json($normalizer->normalize($lecture, null,
            ['groups' => ['index', 'time', 'module', 'attendances']]
        ));
    }

    public function upload(Lecture $lecture,
        Request $request,
        FaceRecognition $recognition,
        NormalizerInterface $normalizer
    ): Response {
        $entityManager = $this->getDoctrine()->getManager();

        $file = $request->files->get('file');

        /** @var array|Student $students */
        $students = $entityManager->getRepository(Student::class)->findInLecture($lecture);

        // Map (index => encoding)
        $withEncodings = array_filter($students, function (Student $student) {
            return $student->hasEncoding();
        });

        $encodings = array_map(function (Student $student) {
            return $student->getEncoding();
        }, array_values($withEncodings));

        try {
            $mask = $recognition->compareFacesWithEncodings($encodings, $file);
            $withEncodings = array_combine(array_keys($withEncodings), $mask);

            $lecture->setAttendances($this->createAttendancesFromMask($students, $withEncodings));
        } catch (GuzzleException $e) {
            return $this->json($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        return $this->json($normalizer->normalize($lecture, null,
            ['groups' => ['index', 'attendances']]
        ));
    }

    public function new(Request $request): Response
    {
        $lecture = new Lecture();
        $form = $this->createForm(LectureType::class, $lecture);
        $form->submit($request->getContent());

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($lecture);
            $em->flush();

            return $this->json($lecture, Response::HTTP_CREATED);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function edit(Request $request, Lecture $lecture): Response
    {
        $form = $this->createForm(LectureType::class, $lecture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->json(['id' => $lecture->getId()]);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function delete(Request $request, Lecture $lecture): Response
    {
        if ($this->isCsrfTokenValid('delete'.$lecture->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($lecture);
            $em->flush();

            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param array|Student $students
     * @param array|bool    $compared
     *
     * @return ArrayCollection
     */
    private function createAttendancesFromMask($students, $compared)
    {
        $attendances = new ArrayCollection();
        foreach ($compared as $index => $hasAttended) {
            $attendance = (new Attendance())
                ->setStudent($students[$index])
                ->setAttended($hasAttended);

            $attendances->add($attendance);
        }
        
        return $attendances;
    }
}
