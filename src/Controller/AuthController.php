<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthController extends AbstractController
{
    public function login(): Response
    {
        $user = $this->getUser();
        if ($user instanceof UserInterface) {
            return $this->json('', Response::HTTP_OK);
        }

        return $this->json('', Response::HTTP_BAD_REQUEST);
    }

    public function logout(Request $request): Response
    {
        $request->getSession()->start();
        session_destroy();
        return $this->json('', Response::HTTP_OK);
    }
}
