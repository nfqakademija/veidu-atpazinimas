<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class BaseController extends AbstractController
{
    /** @var NormalizerInterface */
    private $normalizer;

    /**
     * LectureController constructor.
     * @param NormalizerInterface $normalizer
     */
    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    public function jsonEntity($entity, $groups = ['index'], $status = Response::HTTP_OK)
    {
        return $this->json($this->normalizer->normalize($entity, null, [
            'groups' => $groups
        ]), $status);
    }
}
