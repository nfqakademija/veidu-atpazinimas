<?php

namespace App\Controller;

use App\Entity\StudentGroup;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GroupController extends Controller
{
    public function new(Request $request): Response
    {
        $group = new StudentGroup();
        $form = $this->createForm(GroupType::class, $group);
        $form->submit($request->getContent());

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($group);
            $em->flush();

            return new JsonResponse($group, '201');
        }

        return new Response('', 400);
    }

    public function show(StudentGroup $group): Response
    {
        return new JsonResponse($group);
    }

    public function edit(Request $request, StudentGroup $group): Response
    {
        $form = $this->createForm(GroupType::class, $group);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return new JsonResponse(['id' => $group->getId()]);
        }

        return new Response('', 400);
    }

    public function delete(Request $request, StudentGroup $group): Response
    {
        if ($this->isCsrfTokenValid('delete' . $group->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($group);
            $em->flush();
            return new Response('', 204);
        }

        return new Response('', 400);
    }
}
