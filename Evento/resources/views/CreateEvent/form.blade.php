@section('content')


<div class="form-group">
    <label>Event Name</label>
    <input type="text" name="event_name" class="form-control" value="{{ old('event_name', $event->event_name ?? '') }}" required>
</div>

<div class="form-group">
    <label>Description</label>
    <textarea name="description" class="form-control" required>{{ old('description', $event->description ?? '') }}</textarea>
</div>

<div class="form-group">
    <label>Price</label>
    <input type="number" name="price" class="form-control" value="{{ old('price', $event->price ?? '') }}" required>
</div>

<div class="form-group">
    <label>Address</label>
    <input type="text" name="address" class="form-control" value="{{ old('address', $event->address ?? '') }}" required>
</div>

<div class="form-group">
    <label>Number of Tickets</label>
    <input type="number" name="number_of_ticket" class="form-control" value="{{ old('number_of_ticket', $event->number_of_ticket ?? '') }}" required>
</div>

<div class="form-group">
    <label>Status</label>
    <select name="status" class="form-control" required>
        <option value="pending" {{ old('status', $event->status ?? '') == 'pending' ? 'selected' : '' }}>Pending</option>
        <option value="accepted" {{ old('status', $event->status ?? '') == 'accepted' ? 'selected' : '' }}>Accepted</option>
        <option value="rejected" {{ old('status', $event->status ?? '') == 'rejected' ? 'selected' : '' }}>Rejected</option>
    </select>
</div>

<div class="form-group">
    <label>Event Date</label>
    <input type="date" name="date" class="form-control" value="{{ old('date', isset($event->date) ? $event->date->format('Y-m-d') : '') }}" required>
</div>

<div class="form-group">
    <label>Image URL</label>
    <input type="text" name="photo" class="form-control" value="{{ old('photo', $event->Photo ?? '') }}">
</div>

<div class="form-group">
    <label>Category ID</label>
    <input type="number" name="category_id" class="form-control" value="{{ old('category_id', $event->category_id ?? '') }}" required>
</div>

<div class="form-group">
    <label>User ID</label>
    <input type="number" name="user_id" class="form-control" value="{{ old('user_id', $event->user_id ?? '') }}" required>
</div>
@endsection
