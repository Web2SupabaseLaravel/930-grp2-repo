@extends('layouts.app')

@section('content')
<div class="container">
    <h2>جميع الأحداث</h2>
    
    @if(count($events) > 0)
        <div class="row">
            @foreach($events as $event)
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ $event->event_name }}</h5>
                            <p class="card-text">{{ $event->description }}</p>
                            <a href="{{ route('events.show', $event->id) }}" class="btn btn-primary">عرض التفاصيل</a>
                            <a href="{{ route('events.edit', $event->id) }}" class="btn btn-warning">تعديل</a>
                            <form action="{{ route('events.destroy', $event->id) }}" method="POST" style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" onclick="return confirm('هل أنت متأكد من الحذف؟')">حذف</button>
                            </form>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <p>لا توجد أحداث لعرضها.</p>
    @endif
    
    <a href="{{ route('events.create') }}" class="btn btn-success">إضافة حدث جديد</a>
</div>
@endsection
