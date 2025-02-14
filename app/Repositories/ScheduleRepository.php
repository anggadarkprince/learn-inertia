<?php

namespace App\Repositories;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class ScheduleRepository
{
    public function __construct(private readonly Schedule $schedule)
    {
    }

    public function getAllPaginated(Request $request)
    {
        return $this->schedule->query()
            ->when($request->string('search')->toString(), function($query, $search) {
                $query->where('description', 'LIKE', "%{$search}%");
            })
            ->when($request->string('date')->toString(), function($query, $date) {
                $query->where('date', '=', $date);
            })
            ->when($request->integer('pic_id'), function($query, $picId) {
                $query->where('pic_id', '=', $picId);
            })
            ->when($request->integer('category_id'), function($query, $categoryId) {
                $query->where('category_id', '=', $categoryId);
            })
            ->orderBy('id', 'desc')
            ->with(['pic', 'category'])
            ->paginate()
            ->withQueryString();
    }

    public function getByDate($date)
    {
        return $this->schedule->query()
            ->whereDate('date', Date::parse($date)->format('Y-m-d'))
            ->with(['pic', 'category'])
            ->get();
    }

    public function create($data)
    {
        return $this->schedule->create($data);
    }

    public function update(Schedule $schedule, $data): bool
    {
        return $schedule->fill($data)->save();
    }

    public function delete(Schedule $schedule): ?bool
    {
        return $schedule->delete();
    }
}
