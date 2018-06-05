<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User extends BaseUser
{
    /** @ORM\Column(name="google_id", type="string", length=255, nullable=true) */
    protected $googleId;

    /** @ORM\Column(name="google_access_token", type="string", length=255, nullable=true) */
    protected $googleAccessToken;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"index"})
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Teacher", mappedBy="user", cascade={"persist", "remove"})
     */
    private $teacher;

    public function setGoogleId($googleId)
    {
        $this->googleId = $googleId;
        return $this;
    }

    public function getGoogleId()
    {
        return $this->googleId;
    }

    public function setGoogleAccessToken($googleAccessToken)
    {
        $this->googleAccessToken = $googleAccessToken;
        return $this;
    }

    public function getGoogleAccessToken()
    {
        return $this->googleAccessToken;
    }

    public function getId(): int
    {
        return $this->id;
    }

    #region Teacher
    public function getTeacher(): ?Teacher
    {
        return $this->teacher;
    }

    public function setTeacher(?Teacher $teacher): self
    {
        $this->teacher = $teacher;

        $newUser = $teacher === null ? null : $this;
        if ($newUser !== $teacher->getUser()) {
            $teacher->setUser($newUser);
        }

        return $this;
    }

    public function isTeacher(): bool
    {
        return $this->teacher !== null;
    }

    #endregion
}
