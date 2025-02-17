<?php

namespace App\Http\Controllers;

use App\Services\ReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class ReportController extends Controller
{
    public function __construct(private readonly ReportService $reportService)
    {
    }

    public function scheduleServiceTime(Request $request): Response|ResponseFactory
    {
        return inertia('Reports/ScheduleServiceTime', [
            'scheduleServiceTimes' => Inertia::defer(fn () => $this->reportService->getScheduleServiceTimes($request))
        ]);
    }

    public function ticketSummary(Request $request): Response|ResponseFactory
    {
        return inertia('Reports/TicketSummary', [
            'ticketSummaries' => Inertia::defer(fn () => $this->reportService->getTicketSummaries($request))
        ]);
    }
}
