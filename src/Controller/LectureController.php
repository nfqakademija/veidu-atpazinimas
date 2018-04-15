<?php

namespace App\Controller;

use App\Entity\Lecture;
use App\Form\LectureType;
use App\Repository\LectureRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/lecture")
 */
class LectureController extends Controller
{
    public function new(Request $request): Response
    {
        $lecture = new Lecture();
        $form = $this->createForm(LectureType::class, $lecture);
        $form->submit($request->getContent());

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($lecture);
            $em->flush();

            return new JsonResponse($lecture, '201');
        }

        return new Response('', 400);
    }

    public function show(Lecture $lecture): Response
    {
        return new JsonResponse($lecture);
    }

    public function edit(Request $request, Lecture $lecture): Response
    {
        $form = $this->createForm(LectureType::class, $lecture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return new JsonResponse(['id' => $lecture->getId()]);
        }

        return new Response('', 400);
    }

    public function delete(Request $request, Lecture $lecture): Response
    {
        if ($this->isCsrfTokenValid('delete' . $lecture->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($lecture);
            $em->flush();
            return new Response('', 204);
        }

        return new Response('', 400);
    }
}
