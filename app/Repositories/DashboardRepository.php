<?php

namespace App\Repositories;

use App\Enums\TicketStatus;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class DashboardRepository
{
    public function __construct()
    {
    }

    public function getStatistic($date)
    {
        return [
            'open_ticket' => Ticket::whereHas('schedule', function(Builder $query) use($date) {
                $query->whereDate('date', $date)
                    ->where('status', TicketStatus::OPEN);
            })->count(),
            'closed_ticket' => Ticket::whereHas('schedule', function(Builder $query) use($date) {
                $query->whereDate('date', $date)
                    ->where('status', TicketStatus::CLOSED);
            })->count(),
            'peak_hour' => Ticket::query()
                ->select([
                    DB::raw("STRFTIME('%Y-%m-%d %H:00:00', created_at) AS range"),
                    DB::raw('MIN(created_at) AS min'),
                    DB::raw('MAX(created_at) AS max'),
                    DB::raw('COUNT(*) as total'),
                ])
                ->whereDate('created_at', '>=', Date::parse($date)->subDays(7)->format('Y-m-d'))
                ->groupByRaw("STRFTIME('%Y-%m-%d %H:00:00', created_at)")
                ->orderBy('total', 'desc')
                ->first()
                ->toArray(),
            'average_time' => Ticket::query()
                //->selectRaw('(AVG(TIMESTAMPDIFF(SECOND, created_at, taken_at)) / 60) as service_time')
                //->selectRaw('(AVG(TIMESTAMPDIFF(SECOND, taken_at, closed_at)) / 60) as service_time')
                ->selectRaw('AVG(strftime("%s", taken_at) - strftime("%s", created_at)) as waiting_time')
                ->selectRaw('AVG(strftime("%s", closed_at) - strftime("%s", taken_at)) as service_time')
                ->where('status', TicketStatus::CLOSED)
                ->whereDate('created_at', '>=', Date::parse($date)->subDays(7)->format('Y-m-d'))
                ->first()
                ->toArray(),
        ];
    }
}
