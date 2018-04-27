<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GroupRepository")
 */
class StudentGroup
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
     * @return StudentGroup
     */
    public function addStudent(Student $student): self
    {
        if (!$this->students->contains($student)) {
            $this->students[] = $student;
            $student->setGroup($this);
        }

        return $this;
    }

    /**
     * @param Student $student
     * @return StudentGroup
     */
    public function removeStudent(Student $student): self
    {
        if ($this->students->contains($student)) {
            $this->students->removeElement($student);

            if ($student->getGroup() === $this)
                $student->setGroup(null);
        }

        return $this;
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

    /**
     * @param Module $module
     * @return StudentGroup
     */
    public function addModule(Module $module): self
    {
        if (!$this->modules->contains($module)) {
            $this->modules[] = $module;
            $module->addGroup($this);
        }

        return $this;
    }

    /**
     * @param Module $module
     * @return StudentGroup
     */
    public function removeModule(Module $module): self
    {
        if ($this->modules->contains($module)) {
            $this->modules->removeElement($module);

            $module->removeGroup($this);
        }

        return $this;
    }
    #endregion
}
