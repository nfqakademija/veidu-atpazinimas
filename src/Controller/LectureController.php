<?php

namespace App\Controller;

use App\Entity\Lecture;
use App\Entity\Module;
use App\Entity\User;
use App\Form\LectureType;
use Doctrine\Common\Collections\Collection;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class LectureController extends Controller
{
    public function index(NormalizerInterface $normalizer)
    {
        $entityManager = $this->getDoctrine()->getManager();
        // TODO: Get authenticated user

        /** @var Collection|Module $modules */
        $lecturer = $entityManager->getRepository(User::class)->find(19)
            ->getLecturer()
        ;
        
        $lectures = $entityManager->getRepository(Lecture::class)->findByLecturer($lecturer, 10);

        return $this->json($normalizer->normalize($lectures, null,
            ['groups' => ['index', 'info']]
        ));
    }

    public function show(Lecture $lecture, NormalizerInterface $normalizer): Response
    {
        return $this->json($normalizer->normalize($lecture, null,
            ['groups' => ['index', 'info', 'details', 'attendances']]
        ));
    }

    public function upload()
    {

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
