@extends('layouts.app')

@section('content')
<div class="container">
    <h2>إضافة حدث جديد</h2>

    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <form action="{{ route('events.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <!-- إضافة حقل مخفي لمعرف المستخدم -->
        <input type="hidden" name="user_id" value="{{ auth()->id() }}">

        <div class="mb-3">
            <label for="event_name" class="form-label">اسم الحدث</label>
            <input type="text" name="event_name" id="event_name" class="form-control @error('event_name') is-invalid @enderror" value="{{ old('event_name') }}">
            @error('event_name')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">العنوان</label>
            <input type="text" name="address" id="address" class="form-control @error('address') is-invalid @enderror" value="{{ old('address') }}">
            @error('address')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">الوصف</label>
            <textarea name="description" id="description" class="form-control @error('description') is-invalid @enderror">{{ old('description') }}</textarea>
            @error('description')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="photo" class="form-label">رابط صورة الحدث</label>
            <input type="text" name="photo" id="photo" class="form-control @error('photo') is-invalid @enderror" placeholder="https://example.com/image.jpg" value="{{ old('photo') }}">
            <small class="form-text text-muted">أدخل رابط الصورة مباشرة</small>
            @error('photo')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">السعر</label>
            <input type="number" name="price" id="price" class="form-control @error('price') is-invalid @enderror" value="{{ old('price') }}">
            @error('price')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="number_of_ticket" class="form-label">عدد التذاكر</label>
            <input type="number" name="number_of_ticket" id="number_of_ticket" class="form-control @error('number_of_ticket') is-invalid @enderror" value="{{ old('number_of_ticket') }}">
            @error('number_of_ticket')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="date" class="form-label">تاريخ الحدث</label>
            <input type="date" name="date" id="date" class="form-control @error('date') is-invalid @enderror" value="{{ old('date') }}">
            @error('date')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="status" class="form-label">الحالة</label>
            <select name="status" id="status" class="form-control @error('status') is-invalid @enderror">
                <option value="pending" {{ old('status') == 'pending' ? 'selected' : '' }}>قيد الانتظار</option>
                <option value="accepted" {{ old('status') == 'accepted' ? 'selected' : '' }}>مقبول</option>
                <option value="rejected" {{ old('status') == 'rejected' ? 'selected' : '' }}>مرفوض</option>
            </select>
            @error('status')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="category_id" class="form-label">الفئة</label>
            <input type="number" name="category_id" id="category_id" class="form-control @error('category_id') is-invalid @enderror" value="{{ old('category_id') }}">
            @error('category_id')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <button type="submit" class="btn btn-success">حفظ</button>
    </form>
</div>
@endsection
