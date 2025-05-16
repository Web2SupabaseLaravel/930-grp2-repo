@extends('layouts.app')

@section('content')
<div class="container">
    <h2 class="mb-4">تعديل الحدث</h2>

    <form action="{{ route('events.update', $event->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="event_name" class="form-label">اسم الحدث</label>
            <input type="text" name="event_name" id="event_name" class="form-control" value="{{ $event->event_name }}" required>
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">العنوان</label>
            <input type="text" name="address" id="address" class="form-control" value="{{ $event->address }}" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">الوصف</label>
            <textarea name="description" id="description" class="form-control" required>{{ $event->description }}</textarea>
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">السعر</label>
            <input type="number" name="price" id="price" class="form-control" value="{{ $event->price }}" required>
        </div>

        <div class="mb-3">
            <label for="number_of_ticket" class="form-label">عدد التذاكر</label>
            <input type="number" name="number_of_ticket" id="number_of_ticket" class="form-control" value="{{ $event->number_of_ticket }}" required>
        </div>

        <div class="mb-3">
            <label for="date" class="form-label">تاريخ الحدث</label>
            <input type="date" name="date" id="date" class="form-control" value="{{ $event->date }}" required>
        </div>

        <div class="mb-3">
            <label for="status" class="form-label">الحالة</label>
            <select name="status" id="status" class="form-control">
                <option value="pending" {{ $event->status == 'pending' ? 'selected' : '' }}>قيد الانتظار</option>
                <option value="accepted" {{ $event->status == 'accepted' ? 'selected' : '' }}>مقبول</option>
                <option value="rejected" {{ $event->status == 'rejected' ? 'selected' : '' }}>مرفوض</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="category_id" class="form-label">الفئة</label>
            <input type="number" name="category_id" id="category_id" class="form-control" value="{{ $event->category_id }}" required>
        </div>

        <button type="submit" class="btn btn-primary">تحديث</button>
    </form>
</div>
@endsection
