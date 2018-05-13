<?php

namespace App\Controller;

use App\Entity\Lecture;
use App\Entity\Student;
use App\Entity\Teacher;
use App\Entity\User;
use App\Form\LectureType;
use App\Service\FaceRecognition;
use Doctrine\Common\Collections\Collection;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
        $teacher = $entityManager->getRepository(User::class)->find(13)
            ->getTeacher()
        ;

        $lectures = $entityManager->getRepository(Lecture::class)->findByTeacher($teacher, 10);

        return $this->json($normalizer->normalize($lectures, null,
            ['groups' => ['index', 'time', 'module', 'attendances']]
        ));
    }

    public function show(Lecture $lecture, NormalizerInterface $normalizer): Response
    {
        return $this->json($normalizer->normalize($lecture, null,
            ['groups' => ['index', 'time', 'module', 'attendances']]
        ));
    }

    public function upload(Request $request, FaceRecognition $recognition): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $teacher = $entityManager->getRepository(User::class)->find(13)->getTeacher();

        /** @var Lecture $lecture */
        $lecture = $entityManager->getRepository(Lecture::class)->findByTeacher($teacher)[0];

        $students = $entityManager->getRepository(Student::class)->findInLecture($lecture);

        $encodings = array_map(function (Student $student) {
            return $student->getEncoding();
        }, $students);

        /** @var UploadedFile $file */
        $file = $request->files->get('file');

        try {
            $mask = $recognition->compareFacesWithEncodings($encodings, $file);
        } catch (GuzzleException $e) {
            return new Response('', Response::HTTP_BAD_REQUEST);
        }

        return $this->json($mask);
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
}
