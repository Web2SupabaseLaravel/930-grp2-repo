<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    protected $table = 'profile';
    protected $fillable = [
        'user_id', 'role', 'location', 'photo'
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}
public $timestamps = false;

}
