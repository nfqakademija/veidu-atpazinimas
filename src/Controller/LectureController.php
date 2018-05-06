<?php

namespace App\Controller;

use App\Entity\Attendance;
use App\Entity\Lecture;
use App\Entity\Module;
use App\Form\LectureType;
use Doctrine\Common\Collections\Collection;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LectureController extends Controller
{
    public function index()
    {
        $entityManager = $this->getDoctrine()->getManager();
        // TODO: Get authenticated user

        /** @var Collection|Attendance $modules */
        $modules = $entityManager->getRepository(Lecture::class)->find(442)
            ->getLecturer()
            ->getModules();

        $lectures = $modules->map(function (Module $module) {
            return $module->getLectures();
        });

        return $this->json([
            'lectures' => $lectures,
        ]);
    }

    public function show(Lecture $lecture): Response
    {
        return $this->json($lecture);
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
