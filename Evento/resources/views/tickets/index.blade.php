@extends('layouts.app')

@section('content')
    <h1 style="margin-bottom: 20px;">All Tickets</h1>

    <a href="{{ route('tickets.create') }}" style="display: inline-block; margin-bottom: 20px; padding: 10px 20px; background-color: #38c172; color: white; border-radius: 5px; text-decoration: none;">
        + Add Ticket
    </a>

    @if (session('success'))
        <div style="color: green; margin-bottom: 15px; font-weight: bold;">
            {{ session('success') }}
        </div>
    @endif

    @if ($tickets->count() > 0)
        <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse; text-align: center;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th>Ticket ID</th>
                    <th>Event Name</th>
                    <th>Status</th>
                    <th>User Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($tickets as $ticket)
                    <tr>
                        <td>{{ $ticket->id }}</td>
                        <td>{{ $ticket->event->event_name ?? 'Unknown' }}</td>
                        <td>
                            @switch($ticket->status)
                                @case('pending')
                                    <span style="color: orange;">Pending</span>
                                    @break
                                @case('confirmed')
                                    <span style="color: green;">Confirmed</span>
                                    @break
                                @case('cancelled')
                                    <span style="color: red;">Cancelled</span>
                                    @break
                                @case('booked')
                                    <span style="color: blue;">Booked</span>
                                    @break
                                @default
                                    <span>Unknown</span>
                            @endswitch
                        </td>
                        <td>{{ $ticket->user->name ?? 'Unknown' }}</td>
                        <td>
                            <a href="{{ route('tickets.edit', $ticket) }}" style="color: #3490dc; margin-right: 10px;">Edit</a>

                            <form action="{{ route('tickets.destroy', $ticket) }}" method="POST" style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('Are you sure you want to delete this ticket?')" style="color: red;">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>No tickets available.</p>
    @endif
@endsection
