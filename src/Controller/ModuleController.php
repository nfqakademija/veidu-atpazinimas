<?php

namespace App\Controller;

use App\Entity\Module;
use App\Entity\Teacher;
use App\Form\ModuleType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ModuleController extends BaseController
{
    public function index(): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $teacher = $entityManager->getRepository(Teacher::class)
            ->findOneBy([
                // 'user' => $this->getUser(),
            ]);

        $modules = $teacher->getModules();

        return $this->jsonEntity($modules, ['index', 'teacher', 'groups']);
    }

    public function show(Module $module): Response
    {
        return $this->jsonEntity($module, ['index', 'teacher', 'groups', 'lectures']);
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

            return $this->jsonEntity($module, ['index'], Response::HTTP_CREATED);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function edit(Request $request, Module $module): Response
    {
        $form = $this->createForm(ModuleType::class, $module);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->jsonEntity($module, ['index']);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function delete(Request $request, Module $module): Response
    {
        if ($this->isCsrfTokenValid('delete' . $module->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($module);
            $em->flush();

            return new Response('', Response::HTTP_NO_CONTENT);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }
}
