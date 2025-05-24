@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Edit User: {{ $user->name }}</h2>

    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>@foreach ($errors->all() as $error) <li>{{ $error }}</li> @endforeach</ul>
    </div>
    @endif

    <form action="{{ route('dashboard.user.update', $user->id) }}" method="POST">
        @csrf
        @method('PUT')

        @include('Dash_User._form', ['button' => 'update'])
    </form>
</div>
@endsection
