<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tickets\StoreTicketRequest;
use App\Http\Requests\Tickets\UpdateTicketRequest;
use App\Models\Ticket;
use App\Services\ScheduleService;
use App\Services\TicketService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class TicketController extends Controller
{
    public function __construct(private readonly TicketService $ticketService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response|ResponseFactory
    {
        return inertia("Tickets/Index", [
            'title' => 'Tickets',
            'tickets' => Inertia::defer(fn () => $this->ticketService->getAllPaginated($request))
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, ScheduleService $scheduleService): Response|ResponseFactory
    {
        $date = $request->query('date', date('Y-m-d'));

        $schedules = [];
        if ($date) {
            $schedules = $scheduleService->getByDate($date);
        }

        return inertia('Tickets/Create', compact('schedules'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request): RedirectResponse
    {
        $ticket = $this->ticketService->create($request->validated());

        return to_route('tickets.index')->with([
            'status' => 'success',
            'message' => __('Ticket :ticketNumber in :date successfully created', [
                'ticketNumber' => $ticket->ticket_number,
                'date' => $ticket->schedule->date->format('d F Y'),
            ]),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket): Response|ResponseFactory
    {
        $ticket->load(['schedule' => ['pic', 'category']]);

        return inertia('Tickets/Show', compact('ticket'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket): Response|ResponseFactory
    {
        return inertia('Tickets/Edit', compact('ticket'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket): RedirectResponse
    {
        $this->ticketService->update($ticket, $request->validated());

        return to_route('tickets.index')->with([
            'status' => 'success',
            'message' => __('Ticket :ticketNumber in :date successfully updated', [
                'ticketNumber' => $ticket->ticket_number,
                'date' => $ticket->schedule->date->format('d F Y'),
            ]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket): RedirectResponse
    {
        $this->ticketService->delete($ticket);

        return redirect()->back()->with([
            'status' => 'warning',
            'message' => __('Ticket :ticketNumber in :date successfully deleted', [
                'ticketNumber' => $ticket->ticket_number,
                'date' => $ticket->schedule->date->format('d F Y'),
            ]),
        ]);
    }
}
