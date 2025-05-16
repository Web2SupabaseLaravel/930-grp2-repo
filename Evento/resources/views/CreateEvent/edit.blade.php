@extends('layouts.app')

@section('content')
<div class="container">
    <h2 class="mb-4">Edit Event</h2>

    <form action="{{ route('events.update', $event->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="event_name" class="form-label">Event Name</label>
            <input type="text" name="event_name" id="event_name" class="form-control" value="{{ $event->event_name }}" required>
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input type="text" name="address" id="address" class="form-control" value="{{ $event->address }}" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" id="description" class="form-control" required>{{ $event->description }}</textarea>
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" name="price" id="price" class="form-control" value="{{ $event->price }}" required>
        </div>

        <div class="mb-3">
            <label for="number_of_ticket" class="form-label">Number of Tickets</label>
            <input type="number" name="number_of_ticket" id="number_of_ticket" class="form-control" value="{{ $event->number_of_ticket }}" required>
        </div>

        <div class="mb-3">
            <label for="date" class="form-label">Event Date</label>
            <input type="date" name="date" id="date" class="form-control" value="{{ $event->date }}" required>
        </div>

        <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select name="status" id="status" class="form-control">
                <option value="pending" {{ $event->status == 'pending' ? 'selected' : '' }}>Pending</option>
                <option value="accepted" {{ $event->status == 'accepted' ? 'selected' : '' }}>Accepted</option>
                <option value="rejected" {{ $event->status == 'rejected' ? 'selected' : '' }}>Rejected</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="category_id" class="form-label">Category</label>
            <input type="number" name="category_id" id="category_id" class="form-control" value="{{ $event->category_id }}" required>
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</div>
@endsection
