<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
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
     * @Groups({"index"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Groups({"index"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Assert\NotBlank(message="Please, upload the student's photo as JPEG file.")
     * @Assert\File(mimeTypes={"image/jpeg"})
     * @Groups({"face"})
     */
    private $face;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $encoding;

    /**
     * @ORM\ManyToOne(targetEntity="StudentGroup", inversedBy="students")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"group"})
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

    #region Group    
    /**
     * @return StudentGroup
     */
    public function getGroup(): ?StudentGroup
    {
        return $this->group;
    }

    /**
     * @param StudentGroup $group
     *
     * @return Student
     */
    public function setGroup(?StudentGroup $group): self
    {
        $this->group = $group;

        return $this;
    }
    #endregion

    #region Encoding
    public function getEncoding(): ?string
    {
        return json_decode(base64_decode($this->encoding));
    }

    public function setEncoding(?string $encoding): self
    {
        $this->encoding = base64_decode(json_encode($encoding));

        return $this;
    }
    #endregion
}
