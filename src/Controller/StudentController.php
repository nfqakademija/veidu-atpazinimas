<?php

namespace App\Controller;

use App\Entity\Student;
use App\Form\StudentType;
use App\Repository\StudentRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class StudentController extends BaseController
{
    public function index(Request $request, StudentRepository $studentRepository)
    {
        if ($module = $request->query->getInt('module')) {
            $students = $studentRepository->findInModule($module);
        } elseif ($group = $request->query->getInt('group')) {
            $students = $studentRepository->findBy([
                'group' => $group
            ]);
        } else {
            $students = [];
        }

        return $this->jsonEntity($students, ['index', 'face', 'group']);
    }

    public function show(Student $student): Response
    {
        return $this->jsonEntity($student, ['index', 'face', 'group']);
    }

    public function new(Request $request): Response
    {
        $student = new Student();
        $form = $this->createForm(StudentType::class, $student, ['csrf_protection' => false]);

        $form->submit(array_merge($request->request->all(), ['face' => $request->files->get('face')]));

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $em->persist($student);
            $em->flush();

            return $this->jsonEntity($student, ['index'], Response::HTTP_CREATED);
        } else {
            $errors = [];
            foreach ($form as $child) {
                if (!$child->isValid()) {
                    foreach ($child->getErrors() as $error) {
                        $errors[$child->getName()] = $error->getMessage();
                    }
                }
            }

            return $this->json(['error' => $errors], Response::HTTP_BAD_REQUEST);
        }
    }

    public function edit(Request $request, Student $student): Response
    {
        $form = $this->createForm(StudentType::class, $student);
        $form->submit(json_decode($request->getContent()));

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->json(['id' => $student->getId()]);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function delete(Request $request, Student $student): Response
    {
        if ($this->isCsrfTokenValid('delete' . $student->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($student);
            $em->flush();

            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }
}
