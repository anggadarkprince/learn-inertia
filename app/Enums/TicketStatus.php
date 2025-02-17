<?php

namespace App\Enums;

enum TicketStatus: string
{
    case CANCELED = 'CANCELED';
    case PENDING = 'PENDING';
    case OPEN = 'OPEN';
    case TAKEN = 'TAKEN';
    case CLOSED = 'CLOSED';
}
