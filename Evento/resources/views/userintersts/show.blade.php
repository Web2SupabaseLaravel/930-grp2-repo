@extends('layouts.app')

@section('content')
<div class="container mt-5">
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <h2>Registration details</h2>

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">User: <p class="card-text">{{ $interest->user->name }}</p></h5>


<h5 class="card-title">(Category): <p class="card-text">
    {{ $interest->category ? $interest->category->categories_name : 'There is no classification' }}
</p></h5>



            <div class="mt-4 d-flex gap-2">
                <a href="{{ route('userintersts.edit', $interest->id) }}" class="btn btn-warning">Edit</a>
                <a href="{{ route('userintersts.index') }}" class="btn btn-secondary"> Back to list</a>
            </div>
        </div>
    </div>
</div>
@endsection
