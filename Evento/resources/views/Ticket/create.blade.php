@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <h2 class="mb-4">Create New Ticket</h2>

    @if ($errors->any())
        <div style="color: red; margin-bottom: 15px;">
            <ul style="padding-left: 20px;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('tickets.store') }}" method="POST" style="max-width: 600px;">
        @csrf

        <div style="margin-bottom: 15px;">
            <label for="event_id" style="display: block; margin-bottom: 5px; font-weight: bold;">Select Event:</label>
            <select name="event_id" id="event_id" style="width: 100%; padding: 8px;" required>
                <option value="">-- Choose an Event --</option>
                @foreach($events as $event)
                    <option value="{{ $event->id }}">{{ $event->event_name }}</option>
                @endforeach
            </select>
        </div>

        <div style="margin-bottom: 15px;">
            <label for="user_id" style="display: block; margin-bottom: 5px; font-weight: bold;">Select User:</label>
            <select name="user_id" id="user_id" style="width: 100%; padding: 8px;" required>
                <option value="">-- Choose a User --</option>
                @foreach($users as $user)
                    <option value="{{ $user->id }}">{{ $user->name }}</option>
                @endforeach
            </select>
        </div>

        <div style="margin-bottom: 15px;">
            <label for="status" style="display: block; margin-bottom: 5px; font-weight: bold;">Status:</label>
            <input type="text" name="status" id="status" style="width: 100%; padding: 8px;" required>
        </div>

        <div style="margin-top: 20px;">
            <button type="submit" style="padding: 10px 20px; background-color: #38c172; color: white; border: none; border-radius: 5px;">Add Ticket</button>
            <a href="{{ route('tickets.index') }}" style="padding: 10px 20px; background-color: #6c757d; color: white; border-radius: 5px; text-decoration: none; margin-left: 10px;">Back</a>
        </div>
    </form>
</div>
@endsection
