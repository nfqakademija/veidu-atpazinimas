<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StudentRepository")
 */
class Student
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="string", nullable=true)
     *
     * @Assert\NotBlank(message="Please, upload the image as JPEG/JPG.")
     * @Assert\File(mimeTypes={ "image/jpeg" })
     */
    private $face;

    /**
     * @ORM\ManyToOne(targetEntity="StudentGroup", inversedBy="students")
     * @ORM\JoinColumn(nullable=true)
     */
    private $group;

    #region Getters & Setters
    public function getId()
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getFace()
    {
        return $this->face;
    }

    public function setFace($face): self
    {
        $this->face = $face;
        return $this;
    }
    #endregion

    #region StudentGroup
    /**
     * @return StudentGroup
     */
    public function getGroup(): StudentGroup
    {
        return $this->group;
    }

    /**
     * @param StudentGroup $group
     * @return Student
     */
    public function setGroup(?StudentGroup $group): self
    {
        $this->group = $group;

        return $this;
    }
    #endregion
}
