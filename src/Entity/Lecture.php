<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LectureRepository")
 */
class Lecture implements \JsonSerializable
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
     * @ORM\Column(type="datetime")
     */
    private $start;

    /**
     * @ORM\Column(type="datetime")
     */
    private $end;

    /**
     * @ORM\ManyToOne(targetEntity="Module", inversedBy="lectures")
     * @ORM\JoinColumn(nullable=false)
     */
    private $module;

    /**
     * @ORM\OneToMany(targetEntity="Attendance", mappedBy="lecture")
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

    public function jsonSerialize()
    {
        return [
            'id'    => $this->getId(),
            'title' => $this->getTitle(),
            'start' => $this->getStart()->format(\DateTime::ISO8601),
            'end'   => $this->getEnd()->format(\DateTime::ISO8601),
        ];
    }
}
