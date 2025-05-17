<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();
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
            'status' => 'required|in:pending,accepted,rejected',
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
            'status' => 'required|in:pending,accepted,rejected',
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
