<?php

namespace App\Controller;

use App\Entity\Lecture;
use App\Form\LectureType;
use App\Repository\LectureRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/lecture")
 */
class LectureController extends Controller
{
    /**
     * @Route("/", name="lecture_index", methods="GET")
     */
    public function index(LectureRepository $lectureRepository): Response
    {
        return $this->render('lecture/index.html.twig', ['lectures' => $lectureRepository->findAll()]);
    }

    /**
     * @Route("/new", name="lecture_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $lecture = new Lecture();
        $form = $this->createForm(LectureType::class, $lecture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($lecture);
            $em->flush();

            return $this->redirectToRoute('lecture_index');
        }

        return $this->render('lecture/new.html.twig', [
            'lecture' => $lecture,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="lecture_show", methods="GET")
     */
    public function show(Lecture $lecture): Response
    {
        return $this->render('lecture/show.html.twig', ['lecture' => $lecture]);
    }

    /**
     * @Route("/{id}/edit", name="lecture_edit", methods="GET|POST")
     */
    public function edit(Request $request, Lecture $lecture): Response
    {
        $form = $this->createForm(LectureType::class, $lecture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('lecture_edit', ['id' => $lecture->getId()]);
        }

        return $this->render('lecture/edit.html.twig', [
            'lecture' => $lecture,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="lecture_delete", methods="DELETE")
     */
    public function delete(Request $request, Lecture $lecture): Response
    {
        if ($this->isCsrfTokenValid('delete'.$lecture->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($lecture);
            $em->flush();
        }

        return $this->redirectToRoute('lecture_index');
    }
}
