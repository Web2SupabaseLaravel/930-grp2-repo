<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;

class UserInterstsId extends Model
{
    use HasFactory;

    // تأكد من اسم الجدول في قاعدة البيانات
    protected $table = 'user_intersts_id';

    protected $fillable = ['categorie_id', 'user_id'];

    /**
     * العلاقة مع المستخدم
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * العلاقة مع الفئة
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'categorie_id');
    }
}
