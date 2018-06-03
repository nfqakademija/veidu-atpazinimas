<?php

namespace App\EventListener;

use App\Entity\Student;
use App\Service\FaceRecognition;
use App\Service\FileUploader;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;

class FaceUploadListener
{
    private $uploader;

    private $recognition;

    public function __construct(FileUploader $uploader, FaceRecognition $recognition)
    {
        $this->uploader = $uploader;
        $this->recognition = $recognition;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    private function uploadFile($entity)
    {
        if (!$entity instanceof Student) {
            return;
        }

        $file = $entity->getFace();

        if ($file instanceof File) {
            $fileName = $this->uploader->upload($file);
            $entity->setFace($fileName);
        }

        if (!$entity->hasEncoding() && null !== $entity->getFace()) {
            $this->generateEncoding($entity);
        }
    }

    private function generateEncoding($entity)
    {
        if (!$entity instanceof Student) {
            return;
        }

        $fileName = $entity->getFace();
        $encoding = $this->recognition->calculateFaceEncoding($fileName);

        if (empty($encoding)) {
            // TODO Notify user about bad photo.
            throw new FileException("Face not found in image.");
        }

        $entity->setEncoding($encoding);
    }
}
