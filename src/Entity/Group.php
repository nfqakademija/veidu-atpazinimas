<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GroupRepository")
 */
class Group
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
     * @ORM\OneToMany(targetEntity="Student", mappedBy="group")
     * @ORM\JoinColumn(nullable=true)
     */
    private $students;

    /**
     * @ORM\ManyToMany(targetEntity="Module", mappedBy="groups")
     * @ORM\JoinColumn(nullable=true)
     */
    private $modules;

    public function __construct()
    {
        $this->students = new ArrayCollection();
        $this->modules = new ArrayCollection();
    }

    #region Getter & Setters
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
    #endregion

    #region Students
    /**
     * @return Collection|Student[]
     */
    public function getStudents()
    {
        return $this->students;
    }

    /**
     * @param Student $student
     */
    public function addStudent(Student $student)
    {
        if ($this->students->contains($student))
            return;

        $this->students[] = $student;
        $student->setGroup($this);
    }

    /**
     * @param Student $student
     */
    public function removeStudent(Student $student)
    {
        $this->students->removeElement($student);
        $student->setGroup(null);
    }
    #endregion

    #region Modules
    /**
     * @return Collection|Module[]
     */
    public function getModules()
    {
        return $this->modules;
    }

    public function addModule(Module $module)
    {
        if ($this->students->contains($module))
            return;

        $this->students[] = $module;
        $module->addGroup($this);
    }
    #endregion
}
