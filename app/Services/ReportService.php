<?php

namespace App\Services;

use App\Repositories\ReportRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

readonly class ReportService
{
    public function __construct(private ReportRepository $reportRepository)
    {
    }

    public function getScheduleServiceTimes(Request $request): LengthAwarePaginator
    {
        return $this->reportRepository->getScheduleServiceTimes($request);
    }

    public function getTicketSummaries(Request $request): LengthAwarePaginator
    {
        return $this->reportRepository->getTicketSummaries($request);
    }
}
