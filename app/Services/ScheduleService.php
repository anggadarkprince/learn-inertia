<?php

namespace App\Services;

use App\Models\Schedule;
use App\Repositories\ScheduleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class ScheduleService
{
    public function __construct(private readonly ScheduleRepository $scheduleRepository)
    {
    }

    public function getAllPaginated(Request $request)
    {
        return $this->scheduleRepository->getAllPaginated($request);
    }

    public function getByDate($date)
    {
        return $this->scheduleRepository->getByDate($date);
    }

    public function create(array $data)
    {
        $data['date'] = Date::parse($data['date'])->format('Y-m-d');

        return $this->scheduleRepository->create($data);
    }

    public function update(Schedule $schedule, array $data): bool
    {
        $data['date'] = Date::parse($data['date'])->format('Y-m-d');

        return $this->scheduleRepository->update($schedule, $data);
    }

    public function delete(Schedule $schedule): ?bool
    {
        return $this->scheduleRepository->delete($schedule);
    }
}
