<?php

namespace App\Controller;

use App\Entity\Group;
use App\Entity\Student;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class StudentController extends Controller
{
    public function show($group, $student)
    {
        $entityManager = $this->getDoctrine()->getManager();
    }

    public function new(Group $group, Request $request)
    {
        $content = $request->request;

        $entityManager = $this->getDoctrine()->getManager();

        $student = new Student();
        $student->setName($content->get('Name'));
        // $student->setFace();
        $student->setGroup($group->getId());

        $entityManager->persist($student);
        $entityManager->flush();
    }

    public function edit($group)
    {
    }

    public function delete($group)
    {
    }
}
