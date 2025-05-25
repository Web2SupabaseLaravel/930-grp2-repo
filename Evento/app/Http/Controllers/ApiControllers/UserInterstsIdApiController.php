<?php

namespace App\Http\Controllers\ApiControllers;

use App\Models\UserInterstsId;
use App\Models\User;
use App\Models\Categories;
use Illuminate\Http\Request;

class UserInterstsIdApiController extends Controller
{
    // GET /api/userintersts
    public function index()
    {
        $interests = UserInterstsId::all();
        return response()->json($interests);
    }

    // GET /api/userintersts/create
    public function create()
    {
        $users = User::all();
        $categories = Categories::all();

        return response()->json([
            'users' => $users,
            'categories' => $categories
        ]);
    }

    // POST /api/userintersts
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'categorie_id' => 'required|exists:categories,id',
        ]);

        $interest = UserInterstsId::create($validated);

        return response()->json([
            'message' => 'Added successfully',
            'data' => $interest
        ], 201);
    }

    // GET /api/userintersts/{id}
    public function show($id)
    {
        $interest = UserInterstsId::with(['user', 'category'])->findOrFail($id);
        return response()->json($interest);
    }

    // GET /api/userintersts/{id}/edit
    public function edit($id)
    {
        $interest = UserInterstsId::findOrFail($id);
        return response()->json($interest);
    }

    // PUT or PATCH /api/userintersts/{id}
    public function update(Request $request, $id)
    {
        $interest = UserInterstsId::findOrFail($id);

        $request->validate([
            'categorie_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $interest->update([
            'categorie_id' => $request->categorie_id,
            'user_id' => $request->user_id,
        ]);

        return response()->json([
            'message' => 'Updated successfully',
            'data' => $interest
        ]);
    }

    // DELETE /api/userintersts/{id}
    public function destroy($id)
    {
        $interest = UserInterstsId::findOrFail($id);
        $interest->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
