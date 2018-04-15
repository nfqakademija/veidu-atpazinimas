<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LectureRepository")
 */
class Lecture
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
    private $title;

    /**
     * @ORM\Column(type="datetime")
     */
    private $start;

    /**
     * @ORM\Column(type="datetime")
     */
    private $end;

    /**
     * @ORM\ManyToOne(targetEntity="Module", inversedBy="lectures")
     */
    private $module;

    /**
     * @ORM\ManyToMany(targetEntity="Student", inversedBy="absences")
     * @ORM\JoinColumn(nullable=true)
     */
    private $absences;

    public function __construct() {
        $this->absences = new ArrayCollection();
    }

    #region Getters & Setters
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return null|string
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return Lecture
     */
    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStart(): \DateTime
    {
        return $this->start;
    }

    /**
     * @param \DateTime $start
     * @return Lecture
     */
    public function setStart(\DateTime $start): Lecture
    {
        $this->start = $start;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEnd(): \DateTime
    {
        return $this->end;
    }

    /**
     * @param \DateTime $end
     * @return Lecture
     */
    public function setEnd(\DateTime $end): Lecture
    {
        $this->end = $end;
        return $this;
    }
    #endregion

    #region Module
    /**
     * @return Module
     */
    public function getModule(): Module
    {
        return $this->module;
    }

    /**
     * @param Module $module
     * @return Lecture
     */
    public function setModule($module): self
    {
        $this->module = $module;
        return $this;
    }
    #endregion

    #region Absences
    /**
     * @return Collection|Student[]
     */
    public function getAbsences()
    {
        return $this->absences;
    }

    /**
     * @param Student $student
     */
    public function addAbsence(Student $student)
    {
        if (!$student->getGroup()->getModules()->contains($this->getModule()))
            return;

        $this->absences[] = $student;
    }
    #endregion
}
