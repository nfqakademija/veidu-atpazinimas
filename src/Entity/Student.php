<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StudentRepository")
 */
class Student
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
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
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="students")
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

    #region Group
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

        $this->group->addStudent($this);
        return $this;
    }
    #endregion
}
