@extends('layouts.app')

@section('content')
<div class="container">
    <div class="alert alert-success">
        Event deleted successfully!
    </div>

    <a href="{{ route('events.index') }}" class="btn btn-primary">Back to List</a>
</div>
@endsection
