<?php

namespace App\Controller;

use App\Entity\Lecture;
use App\Form\LectureType;
use App\Repository\LectureRepository;
use App\Repository\TeacherRepository;
use App\Service\AttendanceRecognition;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LectureController extends BaseController
{
    public function index(TeacherRepository $teacherRepository, LectureRepository $lectureRepository): Response
    {
        $teacher = $teacherRepository->findOneBy([
            //'user' => $this->getUser()
        ]);

        $lectures = $lectureRepository->findByTeacher($teacher, 10);

        return $this->jsonEntity($lectures, ['index', 'time', 'module', 'count']);
    }

    public function show(Lecture $lecture): Response
    {
        return $this->jsonEntity($lecture, ['index', 'time', 'module', 'attendances', 'face']);
    }

    public function upload(
        Lecture $lecture,
        Request $request,
        AttendanceRecognition $attendanceRecognition
    ): Response {
        $image = $request->files->get('file');

        try {
            $attendances = $attendanceRecognition->checkAttendances($lecture, $image);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()]);
        }
        
        $lecture->setAttendances($attendances);
        
        $em = $this->getDoctrine()->getManager();
        $em->flush();
        
        return $this->jsonEntity($lecture, ['index', 'attendances']);
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
