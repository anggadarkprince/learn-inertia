<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $fillable = [
        'category_id',
        'pic_id',
        'date',
        'description',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function pic(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pic_id', 'id');
    }
}
