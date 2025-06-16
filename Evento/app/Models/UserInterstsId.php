<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Categories;
class UserInterstsId extends Model
{
    public $timestamps = false;
    use HasFactory;

    protected $table = 'user_intersts_id';

    protected $fillable = [

    'categorie_id',
     'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function categories()
    {
        return $this->belongsTo(Categories::class, 'categorie_id');
    }
}
