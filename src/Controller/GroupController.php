<?php

namespace App\Controller;

use App\Entity\Group;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GroupController extends Controller
{
    public function index()
    {
        $entityManager = $this->getDoctrine()->getManager();
        
    }

    public function new(Request $request)
    {
        $group = new Group();
        $form = $this->createForm(Group::class, $group);
        $content = $request->request;


        $group->setTitle($content->get($content));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($group);
        $entityManager->flush();
    }

    public function show($group)
    {
        $group = $this->getDoctrine()->getRepository(Group::class)->find($group);

        if(!$group)
            throw $this->createNotFoundException('The group does not exist');

        return new JsonResponse($group);
    }

    public function edit($group)
    {
    }

    public function delete($group)
    {
    }
}
