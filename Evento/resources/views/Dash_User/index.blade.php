@extends('layouts.app')

@section('content')
<!-- Filters -->
<form method="GET" action="{{ route('dashboard.user.index') }}" class="row g-3 align-items-center my-4">
    <div class="col-auto">
        <input type="text" name="search" value="{{ request('search') }}" class="form-control" placeholder="Search name or email">
    </div>

    <div class="col-auto">
        <select name="sort_by" class="form-select">
            <option value="id" {{ request('sort_by') == 'id' ? 'selected' : '' }}>Sort by ID</option>
            <option value="name" {{ request('sort_by') == 'name' ? 'selected' : '' }}>Sort by Name</option>
            <option value="email" {{ request('sort_by') == 'email' ? 'selected' : '' }}>Sort by Email</option>
        </select>
    </div>

    <div class="col-auto">
        <select name="sort_direction" class="form-select">
            <option value="asc" {{ request('sort_direction') == 'asc' ? 'selected' : '' }}>Ascending</option>
            <option value="desc" {{ request('sort_direction') == 'desc' ? 'selected' : '' }}>Descending</option>
        </select>
    </div>

    {{-- Optional role filter if you have a "role" column --}}
    {{-- <div class="col-auto">
        <select name="role" class="form-select">
            <option value="">All Roles</option>
            <option value="admin" {{ request('role') == 'admin' ? 'selected' : '' }}>Admin</option>
            <option value="user" {{ request('role') == 'user' ? 'selected' : '' }}>User</option>
        </select>
    </div> --}}

    <div class="col-auto">
        <button type="submit" class="btn btn-primary">Apply</button>
        <a href="{{ route('dashboard.user.index') }}" class="btn btn-secondary">Reset</a>
    </div>
</form>

<div class="container">
    <h2 class="d-flex justify-content-between align-items-center">
        Dashboard Users
        <a href="{{ route('dashboard.user.create') }}" class="btn btn-success">
            <i class="bi bi-plus-lg"></i> Add New User
        </a>
    </h2>

    <!-- Total Users -->
    <div class="alert alert-primary d-flex align-items-center shadow-sm" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people-fill me-2" viewBox="0 0 16 16">
            <path d="M13 7c1.105 0 2-.672 2-1.5S14.105 4 13 4s-2 .672-2 1.5S11.895 7 13 7zM3 7c1.105 0 2-.672 2-1.5S4.105 4 3 4 1 4.672 1 5.5 1.895 7 3 7zm10 1c-1.657 0-3 1.12-3 2.5V12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.5c0-1.38-1.343-2.5-3-2.5zM3 8c-1.657 0-3 1.12-3 2.5V12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.5C6 9.12 4.657 8 3 8z"/>
        </svg>
        <div>
            <strong>Total Users:</strong> {{ $users->count() }}
        </div>
    </div>

    <!-- Total Events -->
    <div class="alert alert-success d-flex align-items-center shadow-sm" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-calendar-event me-2" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v1H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"/>
            <path d="M11 7h1v1h-1V7z"/>
        </svg>
        <div>
            <strong>Total Events:</strong> {{ $total_events }}
        </div>
    </div>

    <!-- Success Message -->
    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <!-- Users Table -->
    <table class="table table-bordered mt-3">
        <thead class="table-light">
            <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>
                    <a href="{{ route('dashboard.user.show', $user->id) }}" class="btn btn-info btn-sm">Show</a>
                    <a href="{{ route('dashboard.user.edit', $user->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('dashboard.user.destroy', $user->id) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-danger btn-sm" onclick="return confirm('Are you sure?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
