@extends('layouts.app')

@section('content')
<div class="container">
    <div class="alert alert-success">
        تم حذف الحدث بنجاح!
    </div>

    <a href="{{ route('events.index') }}" class="btn btn-primary">العودة إلى القائمة</a>
</div>
@endsection
