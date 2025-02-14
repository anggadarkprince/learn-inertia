<?php

namespace App\Services;

use App\Enums\TicketStatus;
use App\Models\Ticket;
use App\Repositories\TicketRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class TicketService
{
    public function __construct(private readonly TicketRepository $ticketRepository)
    {
    }

    public function getAllPaginated(Request $request)
    {
        return $this->ticketRepository->getAllPaginated($request);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $data['ticket_number'] =  $this->ticketRepository->generateTicketNumber();
            $data['queue'] =  $this->ticketRepository->getNextQueue([$data['schedule_id']]);
            $data['status'] = TicketStatus::OPEN;
            $data['name'] = empty($data['name']) ? ('Customer ' . $data['queue']) : '';

            return $this->ticketRepository->create($data);
        });
    }

    public function update(Ticket $ticket, array $data): bool
    {
        return $this->ticketRepository->update($ticket, $data);
    }

    public function delete(Ticket $ticket): ?bool
    {
        return $this->ticketRepository->delete($ticket);
    }
}
