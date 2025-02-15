<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $dashboardService)
    {
    }

    public function index(): Response
    {
        $statistic = $this->dashboardService->getStatistic(date('Y-m-d'));

        return Inertia::render('Dashboard/Index', compact('statistic'));
    }
}
