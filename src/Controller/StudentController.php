<?php

namespace App\Controller;

use App\Entity\Student;
use App\Form\StudentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class StudentController extends Controller
{
    public function new(Request $request): Response
    {
        $student = new Student();
        $form = $this->createForm(StudentType::class, $student);
        $form->submit($request->getContent());

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($student);
            $em->flush();

            return new JsonResponse($student, '201');
        }

        return new Response('', 400);
    }

    public function show(Student $student): Response
    {
        return new JsonResponse($student);
    }

    public function edit(Request $request, Student $student): Response
    {
        $form = $this->createForm(StudentType::class, $student);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return new JsonResponse(['id' => $student->getId()]);
        }

        return new Response('', 400);
    }

    public function delete(Request $request, Student $student): Response
    {
        if ($this->isCsrfTokenValid('delete' . $student->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($student);
            $em->flush();
            return new Response('', 204);
        }

        return new Response('', 400);
    }
}
