@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Event Details</h2>

    <div class="card">
        @if($event->photo)
        <img src="{{ $event->photo }}" class="card-img-top" alt="{{ $event->event_name }}">
        @endif
        <div class="card-body">
            <h5 class="card-title">{{ $event->event_name }}</h5>
            <p class="card-text"><strong>Address:</strong> {{ $event->address }}</p>
            <p class="card-text"><strong>Description:</strong> {{ $event->description }}</p>
            <p class="card-text"><strong>Price:</strong> {{ $event->price }}</p>
            <p class="card-text"><strong>Number of Tickets:</strong> {{ $event->number_of_ticket }}</p>
            <p class="card-text"><strong>Date:</strong> {{ $event->date }}</p>
            <p class="card-text"><strong>Status:</strong> {{ $event->status }}</p>

            <a href="{{ route('events.edit', $event->id) }}" class="btn btn-warning">Edit</a>
            <a href="{{ route('events.index') }}" class="btn btn-secondary">Back to List</a>

            <form action="{{ route('events.destroy', $event->id) }}" method="POST" style="display: inline-block;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete?')">Delete</button>
            </form>
        </div>
    </div>
</div>
@endsection
