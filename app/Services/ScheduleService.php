<?php

namespace App\Services;

use App\Models\Schedule;
use App\Repositories\ScheduleRepository;
use Illuminate\Http\Request;

class ScheduleService
{
    public function __construct(private readonly ScheduleRepository $scheduleRepository)
    {
    }

    public function getAllPaginated(Request $request)
    {
        return $this->scheduleRepository->getAllPaginated($request);
    }

    public function create(array $data)
    {
        return $this->scheduleRepository->create($data);
    }

    public function update(Schedule $schedule, array $data): bool
    {
        return $this->scheduleRepository->update($schedule, $data);
    }

    public function delete(Schedule $schedule): ?bool
    {
        return $this->scheduleRepository->delete($schedule);
    }
}
