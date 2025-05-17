@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h2>Add Feedback</h2>

    <form action="{{ route('feedback.store') }}" method="POST">
        @csrf

        {{-- Event Dropdown --}}
        <div class="mb-3">
            <label for="event_id" class="form-label">Select Event</label>
            <select name="event_id" id="event_id" class="form-select">
                @foreach ($events as $event)
                    <option value="{{ $event->id }}">{{ $event->event_name }}</option>
                @endforeach
            </select>
            @error('event_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Comment --}}
        <div class="mb-3">
            <label for="comment" class="form-label">Comment</label>
            <textarea name="comment" id="comment" class="form-control" rows="3">{{ old('comment') }}</textarea>
            @error('comment')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Rating --}}
        <div class="mb-3">
            <label for="rating" class="form-label">Rating</label>
            <select name="rating" id="rating" class="form-select">
                @for ($i = 1; $i <= 5; $i++)
                    <option value="{{ $i }}">{{ $i }} Star{{ $i > 1 ? 's' : '' }}</option>
                @endfor
            </select>
            @error('rating')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <button type="submit" class="btn btn-success">Submit Feedback</button>
    </form>
</div>
@endsection
