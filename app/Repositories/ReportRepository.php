<?php

namespace App\Repositories;

use App\Enums\TicketStatus;
use App\Models\Schedule;
use App\Models\Ticket;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportRepository
{
    public function __construct(
        private readonly Schedule $schedule,
        private readonly Ticket $ticket,
    ) {}

    public function getScheduleServiceTimes(Request $request): LengthAwarePaginator
    {
        return $this->schedule->query()
            ->select([
                'schedules.id',
                'schedules.date',
                'categories.category',
                'users.name AS pic_name',
                DB::raw('COUNT(tickets.id) AS total_ticket'),
                DB::raw('AVG(strftime("%s", tickets.taken_at) - strftime("%s", tickets.created_at)) / 60 AS avg_waiting'),
                DB::raw('AVG(strftime("%s", tickets.closed_at) - strftime("%s", tickets.taken_at)) / 60 AS avg_service'),
                DB::raw('MIN(strftime("%s", tickets.taken_at) - strftime("%s", tickets.created_at)) / 60 AS min_waiting'),
                DB::raw('MAX(strftime("%s", tickets.taken_at) - strftime("%s", tickets.created_at)) / 60 AS max_waiting'),
                DB::raw('MIN(strftime("%s", tickets.closed_at) - strftime("%s", tickets.taken_at)) / 60 AS min_service'),
                DB::raw('MAX(strftime("%s", tickets.closed_at) - strftime("%s", tickets.taken_at)) / 60 AS max_service'),
            ])
            ->join('categories', 'categories.id', '=', 'schedules.category_id')
            ->leftJoin('users', 'users.id', '=', 'schedules.pic_id')
            ->leftJoin('tickets', function (JoinClause $join) {
                $join->on('tickets.schedule_id', '=', 'schedules.id')
                    ->where('tickets.status', TicketStatus::CLOSED);
            })
            ->when($request->string('date')->toString(), function($query, $date) {
                $query->where('schedules.date', '=', $date);
            })
            ->when($request->integer('pic_id'), function($query, $picId) {
                $query->where('schedules.pic_id', '=', $picId);
            })
            ->when($request->integer('category_id'), function($query, $categoryId) {
                $query->where('category_id', '=', $categoryId);
            })
            ->groupBy('schedules.id')
            ->orderBy('date', 'desc')
            ->paginate();
    }

    public function getTicketSummaries(Request $request): LengthAwarePaginator
    {
        return $this->ticket->query()
            ->select([
                'tickets.id',
                'tickets.ticket_number',
                'tickets.queue',
                'schedules.date',
                'categories.category',
                'tickets.name',
                'tickets.phone',
                'tickets.email',
                'tickets.created_at',
                'tickets.taken_at',
                'handlers.name AS handled_by',
                'tickets.closed_at',
                'tickets.status',
            ])
            ->join('schedules', 'schedules.id', '=', 'tickets.schedule_id')
            ->join('categories', 'categories.id', '=', 'schedules.category_id')
            ->leftJoin('users AS handlers', 'handlers.id', '=', 'tickets.handled_by')
            ->when($request->string('date')->toString(), function($query, $date) {
                $query->where('schedules.date', '=', $date);
            })
            ->when($request->integer('pic_id'), function($query, $picId) {
                $query->where('schedules.pic_id', '=', $picId);
            })
            ->when($request->integer('category_id'), function($query, $categoryId) {
                $query->where('schedules.category_id', '=', $categoryId);
            })
            ->when($request->integer('handled_by'), function($query, $handledBy) {
                $query->where('tickets.handled_by', '=', $handledBy);
            })
            ->when($request->string('status')->toString(), function($query, $status) {
                $query->where('tickets.status', '=', $status);
            })
            ->paginate();
    }

}
