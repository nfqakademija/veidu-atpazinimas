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
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"index"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Assert\NotBlank(message="Please, upload the photo as JPEG/PNG file.")
     * @Assert\File(mimeTypes={"image/*"})
     * @Groups({"face"})
     */
    private $face;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $encoding;

    /**
     * @ORM\ManyToOne(targetEntity="StudentGroup", inversedBy="students")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"group"})
     */
    private $group;

    /**
     * @ORM\Column(type="boolean")
     */
    private $shadow;

    /**
     * Student constructor.
     */
    public function __construct()
    {
        $this->shadow = false;
    }
    
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

    public function isShadow()
    {
        return $this->shadow;
    }

    public function setShadow(bool $shadow): self
    {
        $this->shadow = $shadow;
        
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
    public function getEncoding(): array
    {
        return $this->encoding;
    }

    public function setEncoding(array $encoding): self
    {
        $this->encoding = $encoding;

        return $this;
    }

    public function hasEncoding(): bool
    {
        return $this->encoding !== null;
    }
    #endregion
}
