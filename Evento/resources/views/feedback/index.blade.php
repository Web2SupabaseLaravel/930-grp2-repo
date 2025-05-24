@extends('layouts.app')

@section('content')
<div class="container">
    <h1 class="mb-4">All Feedback</h1>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('feedback.create') }}" class="btn btn-primary mb-3">Add Feedback</a>

    {{-- نموذج البحث + الفلاتر + الفرز --}}
    <form method="GET" action="{{ route('feedback.index') }}" class="mb-4 d-flex gap-2 flex-wrap align-items-center">

        <input 
            type="text" 
            name="search" 
            class="form-control" 
            placeholder="Search comments..." 
            value="{{ request('search') }}"
            style="max-width: 200px;"
        >

        <select name="event_id" class="form-select" style="max-width: 200px;">
            <option value="">All Events</option>
            @foreach($events as $event)
                <option value="{{ $event->id }}" {{ request('event_id') == $event->id ? 'selected' : '' }}>
                    {{ $event->event_name }}
                </option>
            @endforeach
        </select>

        <select name="sort_by" class="form-select" style="max-width: 150px;">
            <option value="id" {{ request('sort_by') == 'id' ? 'selected' : '' }}>ID</option>
        </select>

        <select name="sort_order" class="form-select" style="max-width: 150px;">
            <option value="desc" {{ request('sort_order') == 'desc' ? 'selected' : '' }}>Descending</option>
            <option value="asc" {{ request('sort_order') == 'asc' ? 'selected' : '' }}>Ascending</option>
        </select>


        <button type="submit" class="btn btn-secondary">Apply</button>
    </form>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Event</th>
                <th>User</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Actions</th> 
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

    {{-- روابط التصفح لو استخدمت paginate --}}
    {{ $feedbacks->links() }}

</div>
@endsection
