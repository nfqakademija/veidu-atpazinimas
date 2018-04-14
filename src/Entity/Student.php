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
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     *
     * @Assert\NotBlank(message="Please, upload the image as JPEG/JPG.")
     * @Assert\File(mimeTypes={ "image/jpeg" })
     */
    private $face;

    /**
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="group")
     * @ORM\JoinColumn(nullable=true)
     */
    private $group;


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

    /**
     * @return Group
     */
    public function getGroup(): Group
    {
        return $this->group;
    }

    /**
     * @param Group $group
     * @return Student
     */
    public function setGroup(Group $group): self
    {
        $this->group = $group;
        return $this;
    }
}
