<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Event extends Model
{
        protected $table = 'event';
public $timestamps = false;

    protected $fillable = [
        'address',
        'price',
        'description',
        'number_of_ticket',
        'event_name',
        'status',
        'Photo',
        'date',
        'user_id',
        'category_id'
    ];

}
