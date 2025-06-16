<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = ['categories_name'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_interests_id', 'categories_id', 'user_id')
                    ->withTimestamps();
    }
}