@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h2>{{ isset($interest) ? 'تعديل السجل' : 'إضافة سجل جديد' }}</h2>

    <form action="{{ isset($interest) ? route('userinterstsid.update', $interest->id) : route('userinterstsid.store') }}" method="POST">
        @csrf
        @if(isset($interest))
            @method('PUT')
        @endif

        <div class="mb-3">
            <label for="user_id">المستخدم:</label>
            <select name="user_id" class="form-control">
                <option value="">-- اختر مستخدم --</option>
                @foreach($users as $user)
                    <option value="{{ $user->id }}" {{ (isset($interest) && $interest->user_id == $user->id) ? 'selected' : '' }}>
                        {{ $user->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="categorie_id">الفئة:</label>
            <select name="categorie_id" class="form-control">
                <option value="">-- اختر فئة --</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ (isset($interest) && $interest->categorie_id == $category->id) ? 'selected' : '' }}>
                        {{ $category->categories_name }}
                    </option>
                @endforeach
            </select>
        </div>

        <button type="submit" class="btn btn-primary">حفظ</button>
    </form>
</div>
@endsection
