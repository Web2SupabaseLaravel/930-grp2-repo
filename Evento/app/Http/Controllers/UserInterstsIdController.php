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
        return $data;
    }

    public function create()
{
    $users = User::all();
    $categories = categories::all();
    $route = route('userinterstsid.store');
    $method = 'POST';

    return view('user_intersts_id.form', compact('users', 'categories', 'route', 'method'));
}


    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'categorie_id' => 'required|exists:categories,id',
        ]);

        UserInterstsId::create($request->only('user_id', 'categorie_id'));

        return redirect()->route('userinterstsid.index')->with('success', 'تمت الإضافة بنجاح');
    }

    public function edit($id)
    {
        $interest = UserInterstsId::findOrFail($id);
        $users = User::all();
        $categories = Category::all();
        return view('userintersts.form', compact('interest', 'users', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'categorie_id' => 'required|exists:categories,id',
        ]);

        $interest = UserInterstsId::findOrFail($id);
        $interest->update($request->only('user_id', 'categorie_id'));

        return redirect()->route('userintersts.index')->with('success', 'تم التحديث بنجاح');
    }

    public function destroy($id)
    {
        UserInterstsId::findOrFail($id)->delete();
        return redirect()->route('userintersts.index')->with('success', 'تم الحذف بنجاح');
    }

    public function show($id)
{
    $userInterst = UserInterstId::find($id);
    if (!$userInterest) {
        abort(404);
    }
    return view('user_interest_id.show', compact('userInterstid'));
}

}
