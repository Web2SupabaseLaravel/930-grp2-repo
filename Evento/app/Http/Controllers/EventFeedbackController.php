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
public function index(Request $request)
{
    $user = auth()->user();
    $query = EventFeedback::with(['event', 'user']);

    // ✅ فلترة حسب المستخدم إذا لم يكن Admin
    if (!($user->profile && strtolower($user->profile->role) === 'admin')) {
        $query->where('user_id', $user->id);
    }

    // ✅ بحث بالكومنت
    if ($request->filled('search')) {
        $query->where('comment', 'LIKE', '%' . $request->search . '%');
    }

    // ✅ تصفية حسب الحدث
    if ($request->filled('event_id')) {
        $query->where('event_id', $request->event_id);
    }

    // ✅ فرز
    $sortBy = $request->get('sort_by', 'id'); 
    $sortOrder = $request->get('sort_order', 'desc');
    $query->orderBy($sortBy, $sortOrder);

    // ✅ نتائج مع pagination
    $feedbacks = $query->paginate(10)->withQueryString();

    // ✅ جلب قائمة الأحداث للفلتر
    $events = Event::all();

    return view('feedback.index', compact('feedbacks', 'events'));
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['feedback'] = new EventFeedback();
        $data['events'] = Event::all(); 
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
            'comment' => 'required|string|min:10|max:500',
            'rating' => 'required|numeric|min:1|max:5',
        ], [
            'event_id.required' => 'Please select an event',
            'event_id.exists' => 'The selected event is invalid',
            'comment.required' => 'Please provide a comment',
            'comment.min' => 'Comment must be at least 10 characters long',
            'comment.max' => 'Comment cannot exceed 500 characters',
            'rating.required' => 'Please select a rating',
            'rating.min' => 'Rating must be at least 1 star',
            'rating.max' => 'Rating cannot exceed 5 stars',
        ]);

        $feedback = new EventFeedback();
        $feedback->event_id = $request->event_id;
        $feedback->user_id = Auth::id();
        $feedback->comment = $request->comment;
        $feedback->rating = $request->rating;
        $feedback->save();

        return redirect('/feedback')->with('success', 'Feedback submitted successfully!');
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
