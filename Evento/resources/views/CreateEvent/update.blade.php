@extends('layouts.app')

@section('content')
<div class="container">
    <div class="alert alert-success">
        تم تحديث الحدث بنجاح!
    </div>

    <h2>تفاصيل الحدث المحدث</h2>

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ $event->event_name }}</h5>
            <p class="card-text"><strong>العنوان:</strong> {{ $event->address }}</p>
            <p class="card-text"><strong>الوصف:</strong> {{ $event->description }}</p>
            <p class="card-text"><strong>السعر:</strong> {{ $event->price }}</p>
            <p class="card-text"><strong>عدد التذاكر:</strong> {{ $event->number_of_ticket }}</p>
            <p class="card-text"><strong>التاريخ:</strong> {{ $event->date }}</p>
            <p class="card-text"><strong>الحالة:</strong> {{ $event->status }}</p>

            <a href="{{ route('events.index') }}" class="btn btn-primary">العودة إلى القائمة</a>
        </div>
    </div>
</div>
@endsection
