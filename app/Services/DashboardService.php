<?php

namespace App\Services;

use App\Repositories\DashboardRepository;
use Illuminate\Http\Request;

class DashboardService
{
    public function __construct(private readonly DashboardRepository $dashboardRepository)
    {
    }

    public function getStatistic($date)
    {
        return $this->dashboardRepository->getStatistic($date);
    }
}
