<?php

namespace App\Http\Controllers\ApiControllers;

use Illuminate\Http\Request;
use App\Models\RoleRequest;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class RoleRequestApiController extends Controller
{
    public function index()
    {
        $user = Auth::user(); 
        $profile = $user->profile;

        if ($profile && $profile->role === 'admin') {
            $roleRequests = RoleRequest::orderBy('id', 'asc')->get();
            return response()->json(['roleRequests' => $roleRequests], 200);
        } else {
            return response()->json(['message' => 'Unauthorized or no role requests to show'], 403);
        }
    }

    public function create()
    {
        if (auth()->user()->profile && auth()->user()->profile->role === 'admin') {
            return response()->json([
                'route' => 'rolerequest.store',
                'method' => 'post',
                'submitButton' => 'Create',
                'titleForm' => 'Create Role Request'
            ], 200);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'requested_role' => 'required|string|max:255',
        ]);

        $roleRequest = RoleRequest::create([
            'requested_role' => $request->requested_role,
            'user_id' => auth()->id(),
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'تم إرسال طلب الرتبة بنجاح!',
            'roleRequest' => $roleRequest
        ], 201);
    }

    public function show(string $id)
    {
        $roleRequest = RoleRequest::find($id);

        if (!$roleRequest) {
            return response()->json(['message' => 'Role request not found'], 404);
        }

        return response()->json(['roleRequest' => $roleRequest], 200);
    }

    public function edit($id)
    {
        if (!(auth()->user()->profile && auth()->user()->profile->role === 'admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $roleRequest = RoleRequest::findOrFail($id);

        return response()->json([
            'roleRequest' => $roleRequest,
            'route' => ['rolerequest.update', $id],
            'method' => 'put',
            'submitButton' => 'Update',
            'titleForm' => 'Edit Role Request'
        ], 200);
    }

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

        return response()->json(['message' => 'تم تحديث حالة الطلب بنجاح.', 'roleRequest' => $roleRequest], 200);
    }

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

        return response()->json(['message' => 'تم حذف الطلب بنجاح!'], 200);
    }
}
