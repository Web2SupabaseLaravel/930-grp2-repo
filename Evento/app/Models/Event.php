<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

  
    protected $table = 'event';

    protected $fillable = [
        'event_name',
        'address',
        'price',
        'description',
        'number_of_ticket',
        'status',
        'photo',
        'date',
        'user_id',
        'category_id',
    ];

    protected $dates = ['date', 'created_at', 'updated_at'];

    /**
     * علاقة One-to-Many مع التذاكر
     */
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    /**
     * علاقة Many-to-One مع المستخدم (منشئ الفعالية)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * علاقة Many-to-One مع الفئة (Category)
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
