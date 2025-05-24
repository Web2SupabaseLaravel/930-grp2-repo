<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RoleRequest;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class RoleRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */

public function index(Request $request)
{
    $user = Auth::user(); 
    $profile = $user->profile;

    if (!$profile || $profile->role !== 'admin') {
        return view('role_request.index'); 
    }

    $query = RoleRequest::query();

    if ($request->filled('search')) {
        $query->where('requested_role', 'like', '%' . $request->search . '%');
    }

    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    if ($request->filled('sort_by') && in_array($request->sort_by, ['id', 'requested_role', 'status'])) {
        $direction = $request->get('direction', 'asc');
        $query->orderBy($request->sort_by, $direction);
    } else {
        $query->orderBy('id', 'asc');
    }

    $roleRequests = $query->get();

    return view('role_request.index', compact('roleRequests'));
}

    /**
     * Show the form for creating a new resource.
     */
public function create()
{
if (auth()->user()->profile && auth()->user()->profile->role === 'admin') {
} else {
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
    if (!(auth()->user()->profile && auth()->user()->profile->role === 'admin')) {
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
    $validated = $request->validate([
        'status' => 'required|in:pending,accepted,rejected',
    ]);

    $roleRequest = RoleRequest::findOrFail($id);
    $oldStatus = $roleRequest->status;

    $roleRequest->status = $validated['status'];
    $roleRequest->save();

    $profile = Profile::where('user_id', $roleRequest->user_id)->first();

    if ($profile) {
        if ($oldStatus === 'accepted' && $validated['status'] !== 'accepted') {
            $profile->role = 'attendee';
        } elseif ($validated['status'] === 'accepted') {
            $profile->role = $roleRequest->requested_role;
        }
        $profile->save();
    }

return redirect()->route('rolerequest.index')->with('success', 'تم تحديث حالة الطلب بنجاح.');
}




    /**
     * Remove the specified resource from storage.
     */
public function destroy($id)
{
    $roleRequest = RoleRequest::findOrFail($id);

    if ($roleRequest->status === 'accepted') {
        $profile = Profile::where('user_id', $roleRequest->user_id)->first();
        if ($profile) {
            $profile->role = 'attendee';
            $profile->save();
        }
    }

    $roleRequest->delete();

    return redirect()->route('rolerequest.index')->with('success', 'تم حذف الطلب بنجاح!');
}



}
