<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    collectionOperations: ["GET", "POST"],
    itemOperations: [
        "GET" => [
            'normalization_context' => ['groups' => 'read:Customer:item']
        ],
        "DELETE"
    ],
    order: ['id' => 'DESC']
)]
#[ORM\Entity(repositoryClass: CustomerRepository::class)]
class Customer
{
    #[Groups([
        "read:Customer:item",
        "read:Invoice:collection"
    ])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups(["read:Customer:item"])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $email;

    #[Groups([
        "read:Customer:item",
        "read:Invoice:collection"
    ])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $companyName;

    #[Groups(["read:Customer:item"])]
    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Invoice::class)]
    private $invoices;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompanyName(): ?string
    {
        return $this->companyName;
    }

    public function setCompanyName(?string $companyName): self
    {
        $this->companyName = $companyName;

        return $this;
    }

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }
}
