<?php

namespace App\Normalizer;

use App\Entity\StudentGroup;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class GroupNormalizer implements NormalizerInterface
{
    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'    => $object->getId(),
            'title' => $object->getTitle(),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof StudentGroup;
    }
}