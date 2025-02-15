<?php

namespace App\Http\Controllers;

use App\Http\Requests\Schedule\StoreScheduleRequest;
use App\Http\Requests\Schedule\UpdateScheduleRequest;
use App\Models\Schedule;
use App\Services\CategoryService;
use App\Services\ScheduleService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class ScheduleController extends Controller
{
    public function __construct(private readonly ScheduleService $scheduleService)
    {
    }

    /**
     * Display a listing of the schedule.
     */
    public function index(Request $request): Response|ResponseFactory
    {
        return inertia('Schedules/Index', [
            'title' => 'Schedules',
            'schedules' => Inertia::defer(fn () => $this->scheduleService->getAllPaginated($request))
        ]);
    }

    /**
     * Show the form for creating a new schedule.
     */
    public function create(UserService $userService, CategoryService $categoryService): Response|ResponseFactory
    {
        $users = $userService->getAll();
        $categories = $categoryService->getAll();

        return inertia("Schedules/Create", compact('users', 'categories'));
    }

    /**
     * Store a newly created schedule in storage.
     */
    public function store(StoreScheduleRequest $request): RedirectResponse
    {
        $schedule = $this->scheduleService->create($request->validated());

        return to_route('schedules.index')->with([
            'status' => 'success',
            'message' => __('Schedule :date with pic :name successfully created', [
                'date' => $schedule->date,
                'name' => $schedule->pic->name,
            ]),
        ]);
    }

    /**
     * Display the specified schedule.
     */
    public function show(Schedule $schedule): Response|ResponseFactory
    {
        $schedule->load(['pic', 'category', 'tickets']);

        return inertia("Schedules/Show", compact('schedule'));
    }

    /**
     * Show the form for editing the specified schedule.
     */
    public function edit(Schedule $schedule, UserService $userService, CategoryService $categoryService): Response|ResponseFactory
    {
        $users = $userService->getAll();
        $categories = $categoryService->getAll();

        return inertia("Schedules/Edit", compact('schedule', 'users', 'categories'));
    }

    /**
     * Update the specified schedule in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule): RedirectResponse
    {
        $this->scheduleService->update($schedule, $request->validated());

        return to_route('schedules.index')->with([
            'status' => 'success',
            'message' => __('Schedule :date with pic :name successfully updated', [
                'date' => $schedule->date,
                'name' => $schedule->pic->name,
            ]),
        ]);
    }

    /**
     * Remove the specified schedule from storage.
     */
    public function destroy(Schedule $schedule): RedirectResponse
    {
        $this->scheduleService->delete($schedule);

        return redirect()->back()->with([
            'status' => 'warning',
            'message' => __('Schedule :date with pic :name successfully deleted', [
                'date' => $schedule->date,
                'name' => $schedule->pic->name,
            ])
        ]);
    }
}
