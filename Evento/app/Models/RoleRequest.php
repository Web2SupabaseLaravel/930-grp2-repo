<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleRequest extends Model
{
    protected $table = 'role_request';

public $timestamps = false;

protected $fillable = [
    'requested_role',
    'user_id',
    'status',
];
public function profile()
{
    return $this->belongsTo(Profile::class, 'user_id', 'user_id');
}


}
