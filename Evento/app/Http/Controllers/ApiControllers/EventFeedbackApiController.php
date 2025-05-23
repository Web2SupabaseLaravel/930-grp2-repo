<?php

namespace App\Http\Controllers\ApiControllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\EventFeedback;
use App\Models\Event;

class EventFeedbackApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = auth()->user();
            
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized. Please login first.',
                    'debug' => [
                        'auth_check' => auth()->check(),
                        'auth_id' => auth()->id(),
                        'session_id' => session()->getId()
                    ]
                ], 401);
            }

            $feedbacks = [];
            
            try {
                // If user has no profile or is not admin, show only their feedbacks
                if (!$user->profile || strtolower($user->profile->role) !== 'admin') {
                    $feedbacks = EventFeedback::with(['event', 'user'])
                                    ->where('user_id', $user->id)
                                    ->get();
                } else {
                    // Admin can see all feedbacks
                    $feedbacks = EventFeedback::with(['event', 'user'])->get();
                }
            } catch (\Exception $e) {
                \Log::error('Error fetching feedbacks: ' . $e->getMessage());
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error fetching feedbacks',
                    'debug' => [
                        'error' => $e->getMessage(),
                        'line' => $e->getLine(),
                        'file' => $e->getFile()
                    ]
                ], 500);
            }

            return response()->json([
                'status' => 'success',
                'data' => $feedbacks
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in feedback index: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request',
                'debug' => [
                    'error' => $e->getMessage(),
                    'line' => $e->getLine(),
                    'file' => $e->getFile(),
                    'trace' => $e->getTraceAsString()
                ]
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $events = Event::all();
        return response()->json([
            'status' => 'success',
            'data' => [
                'events' => $events
            ]
        ]);
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

        //return redirect('/feedback')->with('success', 'Feedback submitted successfully!');
        return response()->json([
            'status' => 'success',
            'message' => 'Feedback submitted successfully!',
            'data' => $feedback
        ]);
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
        return response()->json([
            'status' => 'success',
            'data' => [
                'feedback' => $feedback,
                'events' => $events
            ]
        ]);
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

        return response()->json([
            'status' => 'success',
            'message' => 'Feedback updated successfully',
            'data' => $feedback
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $feedback = EventFeedback::findOrFail($id);
        $feedback->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Feedback deleted successfully'
        ]);
    }
}
