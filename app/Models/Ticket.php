<?php

namespace App\Models;

use App\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    protected $fillable = [
        'ticket_number',
        'schedule_id',
        'queue',
        'name',
        'email',
        'phone',
        'description',
        'note',
        'status',
        'closed_at',
    ];

    protected $casts = [
        'status' => TicketStatus::class,
    ];

    public function schedule(): BelongsTo
    {
        return $this->belongsTo(Schedule::class, 'schedule_id', 'id');
    }
}
