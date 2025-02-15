<?php

namespace App\Enums;

enum TicketStatus: string
{
    case PENDING = 'PENDING';
    case OPEN = 'OPEN';
    case TAKEN = 'TAKEN';
    case CLOSED = 'CLOSED';
}
