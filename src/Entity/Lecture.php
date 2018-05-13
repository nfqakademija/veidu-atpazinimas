<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LectureRepository")
 */
class Lecture
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
    private $title;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"time"})
     */
    private $start;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"time"})
     */
    private $end;

    /**
     * @ORM\ManyToOne(targetEntity="Module", inversedBy="lectures")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"module"})
     */
    private $module;

    /**
     * @ORM\OneToMany(targetEntity="Attendance", mappedBy="lecture")
     * @Groups({"attendances"})
     */
    private $attendances;

    public function __construct()
    {
        $this->attendances = new ArrayCollection();
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
     *
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
     *
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
     *
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
     *
     * @return Lecture
     */
    public function setModule($module): self
    {
        $this->module = $module;

        return $this;
    }
    #endregion

    #region Attendances
    /**
     * @return Collection|Attendance[]
     */
    public function getAttendances()
    {
        return $this->attendances;
    }

    /**
     * @param Collection|Attendance[] $attendances
     *
     * @return Lecture
     */
    public function setAttendances($attendances): self
    {
        $this->attendances = $attendances;
        /** @var Attendance $attendance */
        foreach ($attendances->getIterator() as $attendance) {
            $attendance->setLecture($this);
        }

        return $this;
    }

    #endregion
}
