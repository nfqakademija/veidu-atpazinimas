<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ModuleRepository")
 */
class Module
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"index"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"index"})
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="Teacher", inversedBy="modules")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"teacher"})
     */
    private $teacher;

    /**
     * @ORM\ManyToMany(targetEntity="StudentGroup", inversedBy="modules")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"groups"})
     */
    private $groups;

    /**
     * @ORM\OneToMany(targetEntity="Lecture", mappedBy="module")
     * @ORM\JoinColumn(nullable=true)
     */
    private $lectures;

    public function __construct()
    {
        $this->groups = new ArrayCollection();
        $this->lectures = new ArrayCollection();
    }

    #region Getters & Setters
    public function getId()
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }
    #endregion

    #region Groups
    /**
     * @return Collection|StudentGroup[]
     */
    public function getGroups()
    {
        return $this->groups;
    }

    /**
     * @param StudentGroup $group
     *
     * @return Module
     */
    public function addGroup(StudentGroup $group): Module
    {
        if (!$this->groups->contains($group)) {
            $this->groups[] = $group;
            $group->addModule($this);
        }

        return $this;
    }

    /**
     * @param StudentGroup $group
     *
     * @return Module
     */
    public function removeGroup(StudentGroup $group)
    {
        if ($this->groups->contains($group)) {
            $this->groups->removeElement($group);
            $group->removeModule($this);
        }

        return $this;
    }
    #endregion

    #region Lectures
    /**
     * @return Collection|Lecture[]
     */
    public function getLectures()
    {
        return $this->lectures;
    }

    /**
     * @param Lecture $lecture
     *
     * @return Module
     */
    public function addLecture(Lecture $lecture): self
    {
        if (!$this->lectures->contains($lecture)) {
            $this->lectures[] = $lecture;
            $lecture->setModule($this);
        }

        return $this;
    }

    /**
     * @param Lecture $lecture
     *
     * @return Module
     */
    public function removeLecture(Lecture $lecture): self
    {
        if ($this->lectures->contains($lecture)) {
            $this->lectures->removeElement($lecture);

            if ($lecture->getModule() === $this) {
                $lecture->setModule(null);
            }
        }

        return $this;
    }
    #endregion

    #region Teacher
    public function getTeacher(): Teacher
    {
        return $this->teacher;
    }

    public function setTeacher(Teacher $teacher): self
    {
        $this->teacher = $teacher;

        return $this;
    }

    #endregion
}
