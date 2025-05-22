<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventFeedback extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'event_id',
        'user_id',
        'comment',
        'rating',
    ];

    public $timestamps = false;

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    

    
}
