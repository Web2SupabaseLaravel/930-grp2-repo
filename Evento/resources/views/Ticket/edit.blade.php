@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <h2 class="mb-4">Edit Ticket #{{ $ticket->id }}</h2>

    @if ($errors->any())
        <div style="color: red; margin-bottom: 15px;">
            <ul style="padding-left: 20px;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('tickets.update', $ticket) }}" method="POST" style="max-width: 600px;">
        @csrf
        @method('PUT')

        <div style="margin-bottom: 15px;">
            <label for="event_id" style="display: block; margin-bottom: 5px; font-weight: bold;">Select Event:</label>
            <select name="event_id" id="event_id" style="width: 100%; padding: 8px;" required>
                <option value="">-- Choose an Event --</option>
                @foreach ($events as $event)
                    <option value="{{ $event->id }}" {{ $ticket->event_id == $event->id ? 'selected' : '' }}>
                        {{ $event->event_name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div style="margin-bottom: 15px;">
            <label for="user_id" style="display: block; margin-bottom: 5px; font-weight: bold;">Select User:</label>
            <select name="user_id" id="user_id" style="width: 100%; padding: 8px;" required>
                <option value="">-- Choose a User --</option>
                @foreach ($users as $user)
                    <option value="{{ $user->id }}" {{ $ticket->user_id == $user->id ? 'selected' : '' }}>
                        {{ $user->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div style="margin-bottom: 15px;">
            <label for="status" style="display: block; margin-bottom: 5px; font-weight: bold;">Status:</label>
            <input type="text" name="status" id="status" value="{{ old('status', $ticket->status) }}" style="width: 100%; padding: 8px;" required>
        </div>

        <div style="margin-top: 20px;">
            <button type="submit" style="padding: 10px 20px; background-color: #3490dc; color: white; border: none; border-radius: 5px;">Update Ticket</button>
            <a href="{{ route('tickets.index') }}" style="padding: 10px 20px; background-color: #6c757d; color: white; border-radius: 5px; text-decoration: none; margin-left: 10px;">Back</a>
        </div>
    </form>
</div>
@endsection
