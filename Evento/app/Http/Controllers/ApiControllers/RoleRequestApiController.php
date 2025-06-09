<?php

namespace App\Http\Controllers\ApiControllers;

use Illuminate\Http\Request;
use App\Models\RoleRequest;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class RoleRequestApiController extends Controller
{
    public function __construct()
    {
        // Removed JWT middleware
    }

    public function index(Request $request)
    {
        try {
            $roleRequests = RoleRequest::with(['user' => function ($query) {
                $query->with('profile');
            }])->orderBy('id', 'asc')->paginate(9);

            return response()->json([
                'success' => true,
                'data' => $roleRequests->items(),
                'pagination' => [
                    'current_page' => $roleRequests->currentPage(),
                    'last_page' => $roleRequests->lastPage(),
                    'per_page' => $roleRequests->perPage(),
                    'total' => $roleRequests->total(),
                ]
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database error: ' . $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function create()
    {
        $user = Auth::user();
        if (!$user || !$user->profile || $user->profile->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        return response()->json([
            'success' => true,
            'route' => 'role-requests.store',
            'method' => 'post',
            'submitButton' => 'Create',
            'titleForm' => 'Create Role Request'
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'requested_role' => 'required|string|max:255',
            ]);

            $roleRequest = RoleRequest::create([
                'requested_role' => $request->requested_role,
                'user_id' => auth()->id(),
                'status' => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'تم إرسال طلب الرتبة بنجاح!',
                'data' => $roleRequest
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating role request: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $roleRequest = RoleRequest::with(['user' => function ($query) {
                $query->with('profile');
            }])->find($id);

            if (!$roleRequest) {
                return response()->json([
                    'success' => false,
                    'message' => 'Role request not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $roleRequest
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving role request: ' . $e->getMessage()
            ], 500);
        }
    }

    public function edit($id)
    {
        try {
            $user = Auth::user();
            if (!$user || !$user->profile || $user->profile->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 403);
            }

            $roleRequest = RoleRequest::with(['user' => function ($query) {
                $query->with('profile');
            }])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $roleRequest,
                'route' => ['role-requests.update', $id],
                'method' => 'put',
                'submitButton' => 'Update',
                'titleForm' => 'Edit Role Request'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error editing role request: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|in:pending,accepted,rejected',
            ]);

            $roleRequest = RoleRequest::with(['user' => function ($query) {
                $query->with('profile');
            }])->findOrFail($id);
            $oldStatus = $roleRequest->status;

            $roleRequest->status = $validated['status'];
            $roleRequest->save();

            $profile = $roleRequest->user->profile;

            if ($profile) {
                if ($oldStatus === 'accepted' && $validated['status'] !== 'accepted') {
                    $profile->role = 'attendee';
                } elseif ($validated['status'] === 'accepted') {
                    $profile->role = $roleRequest->requested_role;
                }
                $profile->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث حالة الطلب بنجاح.',
                'data' => $roleRequest
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating role request: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $roleRequest = RoleRequest::with(['user' => function ($query) {
                $query->with('profile');
            }])->findOrFail($id);

            if ($roleRequest->status === 'accepted') {
                $profile = $roleRequest->user->profile;
                if ($profile) {
                    $profile->role = 'attendee';
                    $profile->save();
                }
            }

            $roleRequest->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف الطلب بنجاح!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting role request: ' . $e->getMessage()
            ], 500);
        }
    }
}