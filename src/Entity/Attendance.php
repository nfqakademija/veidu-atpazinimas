<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AttendanceRepository")
 */
class Attendance implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Lecture", inversedBy="attendances")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lecture;

    /**
     * @ORM\ManyToOne(targetEntity="Student")
     * @ORM\JoinColumn(nullable=false)
     */
    private $student;

    /**
     * @ORM\Column(type="boolean")
     */
    private $attended;

    public function getId()
    {
        return $this->id;
    }

    /**
     * @return Student
     */
    public function getStudent(): Student
    {
        return $this->student;
    }

    /**
     * @param Student $student
     *
     * @return Attendance
     */
    public function setStudent(Student $student): self
    {
        $this->student = $student;

        return $this;
    }
    #endregion

    #region Lecture
    /**
     * @return Lecture
     */
    public function getLecture(): Lecture
    {
        return $this->lecture;
    }

    /**
     * @param Lecture $lecture
     *
     * @return Attendance
     */
    public function setLecture(Lecture $lecture): self
    {
        $this->lecture = $lecture;

        return $this;
    }
    #endregion

    #region Attendance
    /**
     * @return bool
     */
    public function hasAttended(): bool
    {
        return $this->attended;
    }

    /**
     * @param bool $attended
     *
     * @return Attendance
     */
    public function setAttended(bool $attended)
    {
        $this->attended = $attended;

        return $this;
    }

    #endregion

    public function jsonSerialize()
    {
        return [
            'student'  => $this->getStudent(),
            'attended' => $this->hasAttended(),
        ];
    }
}
