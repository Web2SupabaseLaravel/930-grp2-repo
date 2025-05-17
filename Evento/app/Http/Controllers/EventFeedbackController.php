<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\EventFeedback;
use App\Models\Event;

class EventFeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$feedbacks = \App\Models\EventFeedback::with('event', 'user')->get(); // لو بدك تعرض أسماء الأحداث والمستخدمين
        //return view('feedback.index', compact('feedbacks'));

        $user = auth()->user();

        // Check if user has a profile and is an admin
        if ($user->profile && strtolower($user->profile->role) === 'admin') {
            $feedbacks = EventFeedback::with(['event', 'user'])->get();
        } else {
            // إذا مش Admin → رجّع بس اللي كتبهم المستخدم
            $feedbacks = EventFeedback::with(['event', 'user'])
                            ->where('user_id', $user->id)
                            ->get();
        }
    
        return view('feedback.index', compact('feedbacks'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['feedback'] = new EventFeedback();
        $data['events'] = Event::all(); // لو بدك المستخدم يختار الفعالية من قائمة
        $data['route'] = 'feedback.store';
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Feedback';
        $data['submitButton'] = 'Submit';

        return view('feedback.form_feedback', $data);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:event,id',
            'comment' => 'nullable|string',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $feedback = new EventFeedback();
        $feedback->event_id = $request->event_id;
        $feedback->user_id = Auth::id();
        $feedback->comment = $request->comment;
        $feedback->rating = $request->rating;
        $feedback->save();

        return redirect('/feedback');


        
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
    public function edit(string $id)
    {
        $feedback = \App\Models\EventFeedback::findOrFail($id);
        $events = \App\Models\Event::all();
        return view('feedback.edit', compact('feedback', 'events'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'event_id' => 'required|exists:event,id',
            'comment' => 'nullable|string',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $feedback = \App\Models\EventFeedback::findOrFail($id);
        $feedback->event_id = $request->event_id;
        $feedback->comment = $request->comment;
        $feedback->rating = $request->rating;
        $feedback->save();

        return redirect()->route('feedback.index')->with('success', 'Feedback updated successfully.');
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $feedback = \App\Models\EventFeedback::findOrFail($id);
        $feedback->delete();

        return redirect()->route('feedback.index')->with('success', 'Feedback deleted successfully.');
    }
}
