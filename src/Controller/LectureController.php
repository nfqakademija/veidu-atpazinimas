<?php

namespace App\Controller;

use App\Entity\Lecture;
use App\Entity\Student;
use App\Entity\Teacher;
use App\Form\LectureType;
use App\Service\FaceRecognition;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class LectureController extends AbstractController
{
    public function index(NormalizerInterface $normalizer)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $teacher = $entityManager->getRepository(Teacher::class)
            ->findOneBy([
                'user' => $this->getUser(),
            ]);

        if (!$teacher) {
            return new Response('', Response::HTTP_UNAUTHORIZED);
        }
        
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

        /** @var array|Student $students */
        $students = $entityManager->getRepository(Student::class)->findInLecture($lecture);

        $image = $request->files->get('file');
        
        try {
            $lecture->setAttendances($recognition->checkAttendances($students, $image));
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
        if ($this->isCsrfTokenValid('delete' . $lecture->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($lecture);
            $em->flush();

            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }
}
