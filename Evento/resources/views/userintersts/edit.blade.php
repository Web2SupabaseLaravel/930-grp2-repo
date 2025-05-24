<@extends('layouts.app')

@section('content')
<div class="container">
    <h3>Edit interest</h3>

    <form action="{{ route('userintersts.update', $category->id) }}" method="POST">
        @csrf
        @method('PUT')

        {{-- حقل Category ID --}}
        <div class="form-group mb-3">
            <label for="categorie_id">Category ID</label>
            <input type="number" name="categorie_id" class="form-control" value="{{ old('categorie_id', $category->categorie_id) }}">
            @error('categorie_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- حقل User ID --}}
        <div class="form-group mb-3">
            <label for="user_id">User ID</label>
            <input type="number" name="user_id" class="form-control" value="{{ old('user_id', $category->user_id) }}">
            @error('user_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- زر الحفظ --}}
        <button type="submit" class="btn btn-primary">Save modifications</button>
    </form>
</div>
@endsection

