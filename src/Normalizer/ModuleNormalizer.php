<?php

namespace App\Normalizer;

use App\Entity\Module;
use App\Entity\StudentGroup;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ModuleNormalizer implements NormalizerInterface
{
    use NormalizerAwareTrait;

    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'       => $object->getId(),
            'title'    => $object->getTitle(),
            'lecturer' => $object->getLecturer()->getId(),
            'groups'   => array_map(
                function(StudentGroup $group) use ($format, $context) {
                    if ($context['include_relations'] ?? false) {
                        return $this->normalize($group, $format, $context);
                    } else {
                        return $group->getId();
                    }
                },
                $object->getGroups()->getValues()
            )
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Module;
    }
}