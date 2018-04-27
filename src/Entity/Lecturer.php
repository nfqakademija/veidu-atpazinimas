<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LecturerRepository")
 */
class Lecturer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="lecturer", cascade={"persist", "remove"})
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Module", mappedBy="lecturer")
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
    #endregion

    #region User
    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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
            $module->setLecturer($this);
        }

        return $this;
    }

    public function removeModule(Module $module): self
    {
        if ($this->modules->contains($module)) {
            $this->modules->removeElement($module);
            // set the owning side to null (unless already changed)
            if ($module->getLecturer() === $this) {
                $module->setLecturer(null);
            }
        }

        return $this;
    }
    #endregion
}
