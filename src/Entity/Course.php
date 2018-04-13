<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourseRepository")
 */
class Course
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
    private $title;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Student", mappedBy="course")
     */
    private $students;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Lecture", mappedBy="lecture")
     */
    private $lectures;

    public function __construct()
    {
        $this->students = new ArrayCollection();
        $this->lectures = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle($title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection|Student[]
     */
    public function getStudents()
    {
        return $this->students;
    }

    /**
     * @return Collection|Lecture[]
     */
    public function getLectures()
    {
        return $this->lectures;
    }
}
