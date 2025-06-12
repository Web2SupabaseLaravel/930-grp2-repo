<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event'; // تأكد أن اسم الجدول صحيح

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

    // 🔥 العلاقات المضافة
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }
}
