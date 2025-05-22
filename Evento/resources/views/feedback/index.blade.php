@extends('layouts.app')

@section('content')
<div class="container">
    <h1 class="mb-4">All Feedback</h1>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('feedback.create') }}" class="btn btn-primary mb-3">Add Feedback</a>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Event</th>
                <th>User</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Actions</th> <!-- حذفنا عمود Created At -->
            </tr>
        </thead>
        <tbody>
            @foreach($feedbacks as $feedback)
                <tr>
                    <td>{{ $feedback->id }}</td>
                    <td>{{ $feedback->event->event_name ?? 'N/A' }}</td>
                    <td>{{ $feedback->user->name ?? 'N/A' }}</td>
                    <td>{{ $feedback->comment }}</td>
                    <td>{{ $feedback->rating }}</td>
                    <td>
                        <a href="{{ route('feedback.edit', $feedback->id) }}" class="btn btn-sm btn-warning">Edit</a>
                        <form action="{{ route('feedback.destroy', $feedback->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Are you sure?')" class="btn btn-sm btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
