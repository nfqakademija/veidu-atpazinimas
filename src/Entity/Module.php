<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

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
     * @ORM\ManyToOne(targetEntity="App\Entity\Lecturer", inversedBy="modules")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"details"})
     */
    private $lecturer;

    /**
     * @ORM\ManyToMany(targetEntity="StudentGroup", inversedBy="modules")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"groups"})
     */
    private $groups;

    /**
     * @ORM\OneToMany(targetEntity="Lecture", mappedBy="module")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"lectures"})
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

    #region Lecturer
    public function getLecturer(): ?Lecturer
    {
        return $this->lecturer;
    }

    public function setLecturer(?Lecturer $lecturer): self
    {
        $this->lecturer = $lecturer;

        return $this;
    }

    #endregion

    // public function jsonSerialize()
    // {
    //     return [
    //         'id'       => $this->getId(),
    //         'title'    => $this->getTitle(),
    //         'lecturer' => $this->getLecturer()->getId(),
    //         'groups'   => $this->getGroups()->map(function (StudentGroup $group) {
    //             return [
    //                 'id'    => $group->getId(),
    //                 'title' => $group->getTitle(),
    //             ];
    //         }),
    //     ];
    // }
}
