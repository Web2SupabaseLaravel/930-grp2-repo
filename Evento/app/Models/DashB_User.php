<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DashB_User extends Model
{
    protected $table = 'users';
    public $timestamps = false;

    protected $fillable = ['name', 'email', 'password', 'email_verified_at', 'remember_token'];
}
