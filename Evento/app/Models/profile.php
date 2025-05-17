<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profile';
        public $timestamps = false; 

    public function roleRequests()
{
    return $this->hasMany(RoleRequest::class, 'user_id', 'user_id');
}
   protected $fillable = [
        'user_id', 'role', 'location', 'photo'
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}
}
