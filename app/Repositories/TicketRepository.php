<?php

namespace App\Repositories;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketRepository
{
    public function __construct(private readonly Ticket $ticket)
    {
    }

    public function getAllPaginated(Request $request)
    {
        return $this->ticket->query()
            ->when($request->string('search')->toString(), function($query, $search) {
                $query
                    ->where('description', 'LIKE', "%{$search}%")
                    ->orWhere('name', 'LIKE', "%{$search}%");
            })
            ->when($request->integer('schedule_id'), function($query, $scheduleId) {
                $query->where('schedule_id', '=', $scheduleId);
            })
            ->orderBy('id', 'desc')
            ->with(['schedule' => ['pic', 'category'], 'handledBy'])
            ->paginate()
            ->withQueryString();
    }

    public function generateTicketNumber(): string
    {
        $lastTicket = $this->ticket->query()
            ->whereDate('created_at', date('Y-m-d'))
            ->orderByDesc('id')
            ->lockForUpdate()
            ->first();

        if ($lastTicket && preg_match('/(\d{4})$/', $lastTicket->ticket_number, $matches)) {
            $lastNumber = intval($matches[1]);
        } else {
            $lastNumber = 0;
        }
        $orderPad = str_pad((string) ($lastNumber + 1), 4, '0', STR_PAD_LEFT);

        return 'TIC-' . date('ymd') . '-' . $orderPad;
    }

    public function getNextQueue($scheduleId): string
    {
        $lastQueueNumber = $this->ticket->query()
            ->where('schedule_id', $scheduleId)
            ->lockForUpdate()
            ->max('queue') ?? 0;

        return $lastQueueNumber + 1;
    }

    public function create($data)
    {
        return $this->ticket->create($data);
    }

    public function update(Ticket $ticket, $data): bool
    {
        return $ticket->fill($data)->save();
    }

    public function delete(Ticket $ticket): ?bool
    {
        return $ticket->delete();
    }
}
