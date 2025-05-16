@section('content')


<div class="form-group">
    <label>اسم الحدث</label>
    <input type="text" name="event_name" class="form-control" value="{{ old('event_name', $event->event_name ?? '') }}" required>
</div>

<div class="form-group">
    <label>الوصف</label>
    <textarea name="description" class="form-control" required>{{ old('description', $event->description ?? '') }}</textarea>
</div>

<div class="form-group">
    <label>السعر</label>
    <input type="number" name="price" class="form-control" value="{{ old('price', $event->price ?? '') }}" required>
</div>

<div class="form-group">
    <label>العنوان</label>
    <input type="text" name="address" class="form-control" value="{{ old('address', $event->address ?? '') }}" required>
</div>

<div class="form-group">
    <label>عدد التذاكر</label>
    <input type="number" name="number_of_ticket" class="form-control" value="{{ old('number_of_ticket', $event->number_of_ticket ?? '') }}" required>
</div>

<div class="form-group">
    <label>الحالة</label>
    <select name="status" class="form-control" required>
        <option value="pending" {{ old('status', $event->status ?? '') == 'pending' ? 'selected' : '' }}>معلق</option>
        <option value="accepted" {{ old('status', $event->status ?? '') == 'accepted' ? 'selected' : '' }}>مقبول</option>
        <option value="rejected" {{ old('status', $event->status ?? '') == 'rejected' ? 'selected' : '' }}>مرفوض</option>
    </select>
</div>

<div class="form-group">
    <label>تاريخ الحدث</label>
    <input type="date" name="date" class="form-control" value="{{ old('date', isset($event->date) ? $event->date->format('Y-m-d') : '') }}" required>
</div>

<div class="form-group">
    <label>رابط الصورة</label>
    <input type="text" name="photo" class="form-control" value="{{ old('photo', $event->Photo ?? '') }}">
</div>

<div class="form-group">
    <label>معرّف التصنيف</label>
    <input type="number" name="category_id" class="form-control" value="{{ old('category_id', $event->category_id ?? '') }}" required>
</div>

<div class="form-group">
    <label>معرّف المستخدم</label>
    <input type="number" name="user_id" class="form-control" value="{{ old('user_id', $event->user_id ?? '') }}" required>
</div>
@endsection
