<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Ticket;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class TicketsController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with(['event', 'user'])->get();
        $events = Event::all();
        return view('tickets.index', compact('tickets', 'events'));
    }

    
public function create()
{
    $events = Event::all();
    $users = User::all();

    return view('tickets.create', compact('events', 'users'));
}



public function store(Request $request)
{
    $request->validate([
        'event_id' => 'required|exists:events,id',
        'user_id' => 'required|exists:users,id',
        'status' => 'required|string',
    ]);

    try {
        $ticket = Ticket::create([
            'event_id' => $request->event_id,
            'user_id' => $request->user_id,
            'status' => $request->status,
        ]);
    } catch (\Exception $e) {
        return back()->withErrors(['error' => 'فشل في إضافة التذكرة: ' . $e->getMessage()]);
    }

    return redirect()->route('tickets.index')->with('success', 'تمت إضافة التذكرة بنجاح');
}




    public function edit(Ticket $ticket)
    {
        $events = Event::all();
        $users = User::all();
        return view('tickets.edit', compact('ticket', 'events', 'users'));
    }

    public function update(Request $request, Ticket $ticket)
    {

        $ticket->update([
            'event_id' => $request->event_id,
            'user_id' => $request->user_id,
            'status' => $request->status,
        ]);

        return redirect()->route('tickets.index')->with('success', 'تم تحديث التذكرة بنجاح');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return redirect()->route('tickets.index')->with('success', 'تم حذف التذكرة');
    }
}
