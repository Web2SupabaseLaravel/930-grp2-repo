@extends('layouts.app')

@section('content')
<div class="container">
    <h2>تفاصيل الحدث</h2>

    <div class="card">
        @if($event->photo)
        <img src="{{ $event->photo }}" class="card-img-top" alt="{{ $event->event_name }}">
        @endif
        <div class="card-body">
            <h5 class="card-title">{{ $event->event_name }}</h5>
            <p class="card-text"><strong>العنوان:</strong> {{ $event->address }}</p>
            <p class="card-text"><strong>الوصف:</strong> {{ $event->description }}</p>
            <p class="card-text"><strong>السعر:</strong> {{ $event->price }}</p>
            <p class="card-text"><strong>عدد التذاكر:</strong> {{ $event->number_of_ticket }}</p>
            <p class="card-text"><strong>التاريخ:</strong> {{ $event->date }}</p>
            <p class="card-text"><strong>الحالة:</strong> {{ $event->status }}</p>

            <a href="{{ route('events.edit', $event->id) }}" class="btn btn-warning">تعديل</a>
            <a href="{{ route('events.index') }}" class="btn btn-secondary">العودة إلى القائمة</a>

            <form action="{{ route('events.destroy', $event->id) }}" method="POST" style="display: inline-block;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('هل أنت متأكد من الحذف؟')">حذف</button>
            </form>
        </div>
    </div>
</div>
@endsection
