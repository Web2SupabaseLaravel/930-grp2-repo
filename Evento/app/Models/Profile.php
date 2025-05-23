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
// App\Models\User.php

public function profile()
{
    return $this->hasOne(Profile::class, 'user_id', 'id');
}

}