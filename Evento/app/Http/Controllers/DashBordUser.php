<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DashB_User;
use App\Models\Event;
use Illuminate\Support\Facades\Hash;

class DashBordUser extends Controller
{
    public function index(Request $request)
{
    $query = DashB_User::query();

    if ($request->has('search') && $request->search != '') {
        $query->where(function ($q) use ($request) {
            $q->where('name', 'like', '%' . $request->search . '%')
              ->orWhere('email', 'like', '%' . $request->search . '%');
        });
    }

    if ($request->has('role') && $request->role != '') {
        $query->where('role', $request->role);
    }

    $sort_by = $request->get('sort_by', 'id');
    $sort_direction = $request->get('sort_direction', 'asc');
    $query->orderBy($sort_by, $sort_direction);

    $users = $query->get();
    $total_events = Event::count();

    return view('Dash_User.index', compact('users', 'total_events'));
}

    public function create()
    {
        return view('Dash_User.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        DashB_User::create($validatedData);

        return redirect()->route('dashboard.user.index')
                         ->with('success', 'User created successfully.');
    }

    public function show($id)
    {
        $user = DashB_User::findOrFail($id);
        return view('Dash_User.show', compact('user'));
    }

    public function edit($id)
    {
        $user = DashB_User::findOrFail($id);
        return view('Dash_User.edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        $user = DashB_User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if (!empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        } else {
            unset($validatedData['password']);
        }

        $user->update($validatedData);

        return redirect()->route('dashboard.user.index')
                         ->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = DashB_User::findOrFail($id);
        $user->delete();

        return redirect()->route('dashboard.user.index')
                         ->with('success', 'User deleted successfully.');
    }
}
