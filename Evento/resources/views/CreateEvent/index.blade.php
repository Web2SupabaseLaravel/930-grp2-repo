@extends('layouts.app')

@section('content')
<div class="container">
    <h2>All Events</h2>

    <!-- 🔍 Filter/Search/Sort Form -->
    <form method="GET" class="row g-3 mb-4">
        <div class="col-md-4">
            <input type="text" name="search" class="form-control" placeholder="Search by name or address" value="{{ request('search') }}">
        </div>
        <div class="col-md-3">
            <select name="sort_by" class="form-select">
                <option value="date" {{ request('sort_by') == 'date' ? 'selected' : '' }}>Sort by Date</option>
                <option value="price" {{ request('sort_by') == 'price' ? 'selected' : '' }}>Sort by Price</option>
            </select>
        </div>
        <div class="col-md-2">
            <select name="sort_direction" class="form-select">
                <option value="asc" {{ request('sort_direction') == 'asc' ? 'selected' : '' }}>ASC</option>
                <option value="desc" {{ request('sort_direction') == 'desc' ? 'selected' : '' }}>DESC</option>
            </select>
        </div>
        <div class="col-md-2">
            <input type="number" name="category_id" class="form-control" placeholder="Category ID" value="{{ request('category_id') }}">
        </div>
        <div class="col-md-1">
            <button type="submit" class="btn btn-primary w-100">Go</button>
        </div>
    </form>

    <!-- ✅ Display Events -->
    @if(count($events) > 0)
        <div class="row">
            @foreach($events as $event)
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ $event->event_name }}</h5>
                            <p class="card-text">{{ $event->description }}</p>
                            <a href="{{ route('events.show', $event->id) }}" class="btn btn-primary">View Details</a>
                            <a href="{{ route('events.edit', $event->id) }}" class="btn btn-warning">Edit</a>
                            <form action="{{ route('events.destroy', $event->id) }}" method="POST" style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete?')">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <p>No events to display.</p>
    @endif

    <a href="{{ route('events.create') }}" class="btn btn-success">Add New Event</a>
</div>
@endsection
