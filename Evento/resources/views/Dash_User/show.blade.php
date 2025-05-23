@extends('layouts.app')

@section('content')
<div class="container">
    <h2>User Details</h2>

    <div class="card p-3">
        <p><strong>ID:</strong> {{ $user->id }}</p>
        <p><strong>Name:</strong> {{ $user->name }}</p>
        <p><strong>Email:</strong> {{ $user->email }}</p>
    </div>

    <a href="{{ route('dashboard.user.index') }}" class="btn btn-secondary mt-3">Back</a>
</div>
@endsection

