<?php

namespace App\Controller;

use App\Entity\Student;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class StudentController extends Controller
{
    public function save()
    {
        $entityManager = $this->getDoctrine()->getManager();

        $student = new Student();
        $student->setName("Name Surname");
        // $student->setFace();

        $entityManager->persist($student);
        $entityManager->flush();
    }

    public function show()
    {
        $dir_known = 'known/';
        $dir_unknown = 'unknown/';

        $process = new Process(array('face-recognition', $dir_known, $dir_unknown));
        $process->run();

        if (!$process->isSuccessful())
            throw new ProcessFailedException($process);

        echo $process->getOutput();
    }

    public function store(Request $request)
    {

    }
}
