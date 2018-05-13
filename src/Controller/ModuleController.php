<?php

namespace App\Controller;

use App\Entity\Module;
use App\Entity\User;
use App\Form\ModuleType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ModuleController extends AbstractController
{
    public function index(NormalizerInterface $normalizer): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        // TODO Get authenticated user
        $user = $entityManager->getRepository(User::class)->find(12);

        if (!$user) {
            return new Response('', Response::HTTP_UNAUTHORIZED);
        }

        if ($user->isTeacher()) {
            $modules = $user->getTeacher()->getModules();
        } else {
            // TODO Check if user is an administrator
            $modules = $entityManager->getRepository(Module::class)->findAll();
        }

        return $this->json($normalizer->normalize($modules, null, [
            'groups' => ['index', 'groups'],
        ]));
    }

    public function show(Module $module, NormalizerInterface $normalizer): Response
    {
        return $this->json($normalizer->normalize($module, null,
            ['groups' => ['index', 'teacher', 'groups']]
        ));
    }

    public function new(Request $request): Response
    {
        $module = new Module();
        $form = $this->createForm(ModuleType::class, $module);
        $form->submit($request->getContent());

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($module);
            $em->flush();

            return $this->json($module, Response::HTTP_CREATED);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function edit(Request $request, Module $module): Response
    {
        $form = $this->createForm(ModuleType::class, $module);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->json(['id' => $module->getId()]);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function delete(Request $request, Module $module): Response
    {
        if ($this->isCsrfTokenValid('delete'.$module->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($module);
            $em->flush();

            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }
}
