<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AttendanceRepository")
 */
class Attendance
{
    /**
     * @ORM\Id()
     * @ORM\ManyToOne(targetEntity="Student")
     */
    private $students;

    /**
     * @ORM\Id()
     * @ORM\ManyToOne(targetEntity="Lecture")
     */
    private $lectures;

    /**
     * @ORM\Id()
     * @ORM\Column(type="boolean")
     */
    private $attended;

    /**
     * @return mixed
     */
    public function getStudents()
    {
        return $this->students;
    }

    /**
     * @param mixed $students
     * @return Attendance
     */
    public function setStudents($students)
    {
        $this->students = $students;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLectures()
    {
        return $this->lectures;
    }

    /**
     * @param Lecture $lectures
     * @return Attendance
     */
    public function setLectures($lectures)
    {
        $this->lectures = $lectures;
        return $this;
    }

    /**
     * @return bool
     */
    public function getAttended(): bool
    {
        return $this->attended;
    }

    /**
     * @param bool $attended
     * @return Attendance
     */
    public function setAttended(bool $attended)
    {
        $this->attended = $attended;
        return $this;
    }
}
