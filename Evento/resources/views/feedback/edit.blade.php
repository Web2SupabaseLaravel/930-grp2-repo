@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Feedback</h1>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('feedback.update', $feedback->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="event_id" class="form-label">Event</label>
            <select name="event_id" id="event_id" class="form-select" required>
                @foreach($events as $event)
                    <option value="{{ $event->id }}" {{ $feedback->event_id == $event->id ? 'selected' : '' }}>
                        {{ $event->event_name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="comment" class="form-label">Comment</label>
            <textarea name="comment" id="comment" rows="3" class="form-control" required>{{ $feedback->comment }}</textarea>
        </div>

        <div class="mb-3">
            <label for="rating" class="form-label">Rating</label>
            <input type="number" name="rating" id="rating" class="form-control" value="{{ $feedback->rating }}" min="1" max="5" required>
        </div>

        <button type="submit" class="btn btn-success">Update Feedback</button>
        <a href="{{ route('feedback.index') }}" class="btn btn-secondary">Back</a>
    </form>
</div>
@endsection
