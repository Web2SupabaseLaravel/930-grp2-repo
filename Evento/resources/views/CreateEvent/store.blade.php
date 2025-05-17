@extends('layouts.app')

@section('content')
<div class="container">
    <div class="alert alert-success">
        Event created successfully!
    </div>

    <h2>New Event Details</h2>

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ $event->event_name }}</h5>
            <p class="card-text"><strong>Address:</strong> {{ $event->address }}</p>
            <p class="card-text"><strong>Description:</strong> {{ $event->description }}</p>
            <p class="card-text"><strong>Price:</strong> {{ $event->price }}</p>
            <p class="card-text"><strong>Number of Tickets:</strong> {{ $event->number_of_ticket }}</p>
            <p class="card-text"><strong>Date:</strong> {{ $event->date }}</p>
            <p class="card-text"><strong>Status:</strong> {{ $event->status }}</p>

            <a href="{{ route('events.index') }}" class="btn btn-primary">Back to List</a>
        </div>
    </div>
</div>
@endsection
