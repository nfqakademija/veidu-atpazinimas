<?php

namespace App\EventListener;

use App\Entity\Student;
use App\Service\FaceRecognition;
use App\Service\FileUploader;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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

        if ($file instanceof UploadedFile) {
            $fileName = $this->uploader->upload($file);
            $entity->setFace($fileName);
        }

        $encoding = $entity->getEncoding();

        if ($encoding) {
            try {
                $encodingArray = $this->recognition->calculateFaceEncoding($entity->getFace());
            } catch (GuzzleException $exception) {
                $encodingArray = null;
            }

            $entity->setEncoding($encodingArray);
        }
        
    }
}