<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ModuleRepository")
 */
class Module
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="modules")
     */
    private $lecturer;

    /**
     * @ORM\ManyToMany(targetEntity="Group", inversedBy="modules")
     * @ORM\JoinColumn(nullable=true)
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

    #region Lecturer
    /**
     * @return User
     */
    public function getLecturer()
    {
        return $this->lecturer;
    }

    /**
     * @param User $lecturer
     */
    public function setLecturer(User $lecturer)
    {
        if ($lecturer->getRoles() != 'ROLE_LECTURER')
            return;

        if ($this->lecturer == $lecturer)
            return;

        $this->lecturer = $lecturer;
    }
    #endregion

    #region Groups
    /**
     * @return Collection|Group[]
     */
    public function getGroups()
    {
        return $this->groups;
    }

    /**
     * @param Group $group
     */
    public function addGroup(Group $group)
    {
        if ($this->groups->contains($group))
            return;

        $this->groups[] = $group;
        $group->addModule($this);
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
     * @param Lecture $lectures
     * @return Module
     */
    public function setLectures(Lecture $lectures): self
    {
        $this->lectures = $lectures;
        return $this;
    }
    #endregion
}
