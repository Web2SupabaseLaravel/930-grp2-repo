<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
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

    $events = $query->paginate(9)->withQueryString(); // ← مهم لتثبيت التصفية في pagination

    return view('CreateEvent.index', compact('events'));
}


    public function create()
    {
        return view('CreateEvent.create');
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

        return redirect()->route('events.show', $event->id)->with('success', 'تم إنشاء الحدث بنجاح!');
    }
    public function edit($id)
    {
        $event = Event::findOrFail($id);
        return view('CreateEvent.edit', compact('event'));
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'event_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'number_of_ticket' => 'required|integer|min:1',
            'date' => 'required|date',
            'category_id' => 'required|integer|exists:categories,id',
            'user_id' => 'nullable|integer|exists:users,id',
            'photo' => 'nullable|string|max:255',
        ]);

        $event = Event::findOrFail($id);
        $event->update($validatedData);

        return redirect()->route('events.show', $event->id)->with('success', 'تم تحديث الحدث بنجاح');
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return view('CreateEvent.show', compact('event'));
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return redirect()->route('events.index')->with('success', 'تم حذف الحدث بنجاح');
    }
}
