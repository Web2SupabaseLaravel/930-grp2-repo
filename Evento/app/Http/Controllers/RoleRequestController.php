<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RoleRequest;

class RoleRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->type === 'Admin') {
            $roleRequests = RoleRequest::all();
            return view('role_request.index', compact('roleRequests'));
        } else {
            return view('role_request.index');
        }
    }


    /**
     * Show the form for creating a new resource.
     */
public function create()
{
    if (auth()->user()->type !== 'Admin') {
        abort(403, 'Unauthorized');
    }

    return view('role_request.form_role_request', [
        'route' => 'rolerequest.store',
        'method' => 'post',
        'submitButton' => 'Create',
        'titleForm' => 'Create Role Request'
    ]);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // أي مستخدم مسجل يقدر يرسل طلب رتبة
        $request->validate([
            'requested_role' => 'required|string|max:255',
        ]);

        \App\Models\RoleRequest::create([
            'requested_role' => $request->requested_role,
            'user_id' => auth()->id(),
            'status' => 'pending',
        ]);

        return redirect()->route('rolerequest.index')->with('success', 'تم إرسال طلب الرتبة بنجاح!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
public function edit($id)
{
    if (auth()->user()->type !== 'Admin') {
        abort(403, 'Unauthorized');
    }

    $roleRequest = \App\Models\RoleRequest::findOrFail($id);

    return view('role_request.form_role_request', [
        'roleRequest' => $roleRequest,
        'route' => ['rolerequest.update', $id],
        'method' => 'put',
        'submitButton' => 'Update',
        'titleForm' => 'Edit Role Request'
    ]);
}



    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, $id)
{
    if (auth()->user()->type !== 'Admin') {
        abort(403, 'Unauthorized');
    }

    $request->validate([
        'requested_role' => 'required|string|max:255',
        'user_id' => 'required|integer',
        'status' => 'required|in:pending,accepted,rejected',
    ]);

    $roleRequest = \App\Models\RoleRequest::findOrFail($id);
    $roleRequest->update($request->all());

    // إذا الحالة accepted، نحدث نوع المستخدم في جدول users
    if ($request->status === 'accepted') {
        $user = \App\Models\User::find($request->user_id);
        if ($user) {
            $user->type = $request->requested_role;
            $user->save();
        }
    }

    return redirect()->route('rolerequest.index')->with('success', 'تم تحديث الطلب بنجاح!');
}



    /**
     * Remove the specified resource from storage.
     */
public function destroy($id)
{
    if (auth()->user()->type !== 'Admin') {
        abort(403, 'Unauthorized');
    }

    $roleRequest = \App\Models\RoleRequest::findOrFail($id);
    $roleRequest->delete();

    return redirect()->route('rolerequest.index')->with('success', 'تم حذف الطلب بنجاح!');
}


}
