<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    collectionOperations:[
        "GET" => [
            "normalization_context" => ["groups" => "read:Invoice:collection"]
        ],
        "POST"
    ],
    order: ['id' => 'DESC']
)]
#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
class Invoice
{
    #[Groups([
        "read:Customer:item",
        "read:Invoice:collection"
    ])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups([
        "read:Customer:item",
        "read:Invoice:collection"
    ])]
    #[ORM\Column(type: 'integer')]
    private $amount;

    #[Groups([
        "read:Customer:item",
        "read:Invoice:collection"
    ])]
    #[ORM\Column(type: 'datetime')]
    private $sendingAt;

    #[Groups([
        "read:Customer:item",
        "read:Invoice:collection"
    ])]
    #[ORM\Column(type: 'string', length: 255)]
    private $status;

    #[Groups([
        "read:Invoice:collection"
    ])]
    #[ORM\ManyToOne(targetEntity: Customer::class, inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    private $customer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSendingAt(): ?\DateTimeInterface
    {
        return $this->sendingAt;
    }

    public function setSendingAt(\DateTimeInterface $sendingAt): self
    {
        $this->sendingAt = $sendingAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }
}
