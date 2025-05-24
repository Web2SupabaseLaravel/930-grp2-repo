<?php

namespace App\Http\Controllers;
use App\Models\UserInterstsId;
use App\Models\User;
use App\Models\Categories;
use Illuminate\Http\Request;

class UserInterstsIdController extends Controller
{
public function index(){
    $data['categories'] = UserInterstsId::all();
    return view('userintersts.index', $data);
}



    public function create()
{
    $users = User::all();
    $categories = categories::all();
    $route = route('userinterstsid.store');
    $method = 'POST';

    return view('userintersts.create', compact('users', 'categories', 'route', 'method'));
}


  public function store(Request $request)
{
    $validated = $request->validate([
        'user_id' => 'required|exists:users,id',
        'categorie_id' => 'required|exists:categories,id',
    ]);

    $interest = UserInterstsId::create($validated);

    return redirect()->route('userinterstsid.show', $interest->id)
                     ->with('success', 'تمت الإضافة بنجاح');
}



   public function edit($id)
{
    // تجيب العنصر المطلوب للتعديل
    $category = UserInterstsId::findOrFail($id);

    // ترسل البيانات لصفحة التعديل (edit.blade.php)
    return view('userintersts.edit', compact('category'));
}

 public function update(Request $request, $id)
{
    $category = UserInterstsId::findOrFail($id);

    $request->validate([
        'categorie_id' => 'required|integer',
        'user_id' => 'required|integer',
    ]);

    $category->update([
        'categorie_id' => $request->categorie_id,
        'user_id' => $request->user_id,
    ]);

    return redirect()->route('userintersts.index')->with('success', 'تم تحديث البيانات بنجاح');
}



   public function destroy($id)
{
    // تجيب العنصر ثم تحذفه
    $category = UserInterstsId::findOrFail($id);
    $category->delete();

    // ترجع لقائمة العرض مع رسالة نجاح
    return redirect()->route('userintersts.index')->with('success', 'تم حذف العنصر بنجاح');
}


public function show($id)
{
    $interest = UserInterstsId::with(['user', 'category'])->findOrFail($id);
    return view('userintersts.show', compact('interest'));
}


}
