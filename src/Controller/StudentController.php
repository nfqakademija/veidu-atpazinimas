<?php

namespace App\Controller;

use App\Entity\Student;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Symfony\Component\Routing\Annotation\Route;

class StudentController extends Controller
{
    /**
     * @Route("/")
     */
    public function index()
    {
        return $this->render('students/index.html.twig', [
            'controller_name' => 'StudentController',
        ]);
    }

    /**
     * @Route("/students/save")
     * @Method({"POST"})
     */
    public function save()
    {
        $entityManager = $this->getDoctrine()->getManager();

        $student = new Student();
        $student->setName("Name Surname");
        // $student->setFace();

        $entityManager->persist($student);
        $entityManager->flush();
    }

    /**
     * @Route("/show")
     */
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

    /**
     * @Route("/student/create")
     * @Method({"POST"})
     * @param Request $request
     */
    public function store(Request $request)
    {

    }
}
