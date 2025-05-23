@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Add New Dashboard User</h2>

    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>@foreach ($errors->all() as $error) <li>{{ $error }}</li> @endforeach</ul>
    </div>
    @endif

    <form action="{{ route('dashboard.user.store') }}" method="POST">
        @csrf

        @include('Dash_User._form', ['button' => 'Save'])
        </form>
</div>
@endsection
