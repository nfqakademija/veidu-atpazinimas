<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface, \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"index"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=254)
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     */
    private $password;

    /**
     * @ORM\OneToOne(targetEntity="Teacher", mappedBy="user", cascade={"persist", "remove"})
     */
    private $teacher;

    #region Getters & Setters
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return array (Role|string)[] The user roles
     */
    public function getRoles()
    {
        return ['ROLE_ADMIN', 'ROLE_LECTURER'];
    }

    /**
     * @return string The password
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     *
     * @return $this
     */
    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return string The username
     */
    public function getUsername(): string
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     *
     * @return User
     */
    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
    #endregion

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

    #region Serialization
    public function serialize()
    {
        return serialize([
            $this->id,
            $this->email,
            $this->password,
        ]);
    }

    public function unserialize($serialized)
    {
        [
            $this->id,
            $this->email,
            $this->password,
        ]
            = unserialize($serialized, ['allowed_classes' => false]);
    }

    #endregion

    public function getSalt(): ?string { return null; }

    public function eraseCredentials() { }
}
