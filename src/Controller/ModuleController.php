<?php

namespace App\Controller;

use App\Entity\Module;
use App\Entity\User;
use App\Form\ModuleType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ModuleController extends Controller
{
    public function index(NormalizerInterface $normalizer): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->find(442);
        // TODO: Get authenticated user
        
        if (!$user)
            throw new AuthenticationException();
        
        $modules = $user->getLecturer() ? $user->getLecturer()->getModules() : null;

        return new JsonResponse([
            'modules' => $normalizer->normalize($modules, null, ['include_relations' => true]),
        ]);
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

            return new JsonResponse($module);
        }

        return new Response('', Response::HTTP_BAD_REQUEST);
    }

    public function show(Module $module): Response
    {
        return new JsonResponse($module);
    }

    public function edit(Request $request, Module $module): Response
    {
        $form = $this->createForm(ModuleType::class, $module);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return new JsonResponse(['id' => $module->getId()]);
        }

        return new Response('', 400);
    }

    public function delete(Request $request, Module $module): Response
    {
        if ($this->isCsrfTokenValid('delete' . $module->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($module);
            $em->flush();
            return new Response('', 204);
        }

        return new Response('', 400);
    }
}
