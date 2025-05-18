@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h2>{{ isset($interest) ? 'Edit record' : 'Add a new registration' }}</h2>

    <form action="{{ isset($interest) ? route('userinterstsid.update', $interest->id) : route('userinterstsid.store') }}" method="POST">
        @csrf
        @if(isset($interest))
            @method('PUT')
        @endif

        <div class="mb-3">
            <label for="user_id" class="form-label">user:</label>
            <select name="user_id" class="form-control" required>
                <option value="">-- Select user--</option>
                @foreach($users as $user)
                    <option value="{{ $user->id }}" {{ (isset($interest) && $interest->user_id == $user->id) ? 'selected' : '' }}>
                        {{ $user->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="categorie_id" class="form-label">Category:</label>
            <select name="categorie_id" class="form-control" required>
                <option value="">-- Select Category--</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ (isset($interest) && $interest->categorie_id == $category->id) ? 'selected' : '' }}>
                        {{ $category->categories_name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">{{ isset($interest) ? 'Update' : 'Save' }}</button>
        </div>
    </form>
</div>
@endsection
