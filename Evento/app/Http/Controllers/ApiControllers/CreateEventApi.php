<?php

namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;


class CreateEventApi extends Controller

{
    
    public function index(Request $request)
    {
        $query = Event::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('event_name', 'like', "%$search%")
                  ->orWhere('address', 'like', "%$search%");
            });
        }

        $sortBy = $request->get('sort_by', 'date');
        $sortDirection = $request->get('sort_direction', 'asc');
        $query->orderBy($sortBy, $sortDirection);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $events = $query->paginate(9)->withQueryString();

        return response()->json([
            'success' => true,
            'data' => $events->items(), // Extract the items array
            'pagination' => [
                'current_page' => $events->currentPage(),
                'last_page' => $events->lastPage(),
                'per_page' => $events->perPage(),
                'total' => $events->total(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'event_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|url|max:255',
            'price' => 'required|numeric|min:0',
            'number_of_ticket' => 'required|integer|min:1',
            'date' => 'required|date|after_or_equal:today',
            'category_id' => 'required|integer|exists:categories,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $event = Event::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'تم إنشاء الحدث بنجاح!',
            'data' => $event
        ], 201);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $event
        ]);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validatedData = $request->validate([
            'event_name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'photo' => 'nullable|url|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'number_of_ticket' => 'sometimes|required|integer|min:1',
            'date' => 'sometimes|required|date',
            'category_id' => 'sometimes|required|integer|exists:categories,id',
            'user_id' => 'nullable|integer|exists:users,id',
            'status' => 'sometimes|required|in:pending,accepted,rejected',
        ]);

        $event->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث الحدث بنجاح',
            'data' => $event
        ]);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم حذف الحدث بنجاح'
        ]);
    }
}