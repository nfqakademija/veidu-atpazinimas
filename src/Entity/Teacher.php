<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TeacherRepository")
 */
class Teacher
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("index")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Groups({"index"})
     */
    private $name;
    
    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="teacher", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups("index")
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Module", mappedBy="teacher")
     */
    private $modules;

    public function __construct()
    {
        $this->modules = new ArrayCollection();
    }

    #region Getters & Setters
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return null|string
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     *
     * @return Teacher
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
    #endregion

    #region User
    /**
     * @return User|null
     */
    public function getUser(): ?User
    {
        return $this->user;
    }

    /**
     * @param User|null $user
     *
     * @return Teacher
     */
    public function setUser(?User $user): self
    {
        $this->user = $user;

        $newLecturer = $user === null ? null : $this;
        if ($newLecturer !== $user->getTeacher()) {
            $user->setTeacher($newLecturer);
        }

        return $this;
    }
    #endregion

    #region Modules
    /**
     * @return Collection|Module[]
     */
    public function getModules(): Collection
    {
        return $this->modules;
    }

    public function addModule(Module $module): self
    {
        if (!$this->modules->contains($module)) {
            $this->modules[] = $module;
            $module->setTeacher($this);
        }

        return $this;
    }

    public function removeModule(Module $module): self
    {
        if ($this->modules->contains($module)) {
            $this->modules->removeElement($module);
        }

        return $this;
    }
    #endregion

}
