<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Profile;
use App\Models\Category;

class ProfileApiController extends Controller
{
    // middleware auth
   
    // 1. Get profile data
    public function show()
    {
        $user = JWTAuth::parseToken()->authenticate();
    
        $profile = $user->profile ?: new Profile(); // إذا لم يكن هناك ملف شخصي، أنشئ كائنًا فارغًا
        $categories = Category::all('categories_name');
    
        return response()->json([
            'user' => $user->only(['name', 'email']),
            'profile' => [
                'location' => $profile->location ?? 'N/A',
                'phone' => $profile->phone ?? '+970 000 000 000',
            ],
            'categories' => $categories
        ]);
    }

    // 2. Update profile info
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'location' => 'nullable|string|max:255',
            'photo' => 'nullable|string',
            'role' => 'required|string',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        $user->profile()->update([
            'location' => $validated['location'] ?? null,
            'photo' => $validated['photo'] ?? null,
            'role' => $validated['role'],
        ]);

        return response()->json(['message' => 'Profile updated successfully']);
    }

    // 3. Update password
    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }

    // 4. Delete account
    public function destroy(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'password' => 'required|string',
        ]);

        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['The password is incorrect.'],
            ]);
        }

        $user->profile()->delete();
        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
