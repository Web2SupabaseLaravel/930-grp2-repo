<!DOCTYPE html>
<html>
<head>
    <title>Role Requests</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { margin-bottom: 20px; }
        .success { color: green; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        table, th, td { border: 1px solid #ccc; }
        th { background-color: #f2f2f2; }
        th, td { padding: 10px; text-align: left; }
        .actions a, .actions button { margin-right: 5px; }
        .actions form { display: inline; }
        button { background-color: transparent; border: none; color: #c00; cursor: pointer; }
        button:hover { text-decoration: underline; }
    </style>
</head>
<body>

<h1>Role Requests</h1>

@if (session('success'))
    <div class="success">{{ session('success') }}</div>
@endif

@if (auth()->user()->type === 'Admin')

    {{-- عرض جدول الطلبات مع أزرار التعديل والحذف --}}
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Requested Role</th>
                <th>User ID</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($roleRequests as $item)
                <tr>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->requested_role }}</td>
                    <td>{{ $item->user_id }}</td>
                    <td>{{ $item->status }}</td>
                    <td class="actions">
                        <a href="{{ route('rolerequest.edit', $item->id) }}">Edit</a>
                        <form action="{{ route('rolerequest.destroy', $item->id) }}" method="POST" onsubmit="return confirm('هل أنت متأكد من الحذف؟');" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="5">No role requests found.</td></tr>
            @endforelse
        </tbody>
    </table>

@else

    {{-- عرض نموذج طلب رتبة للمستخدم العادي --}}
    <form action="{{ route('rolerequest.store') }}" method="POST" style="margin-top: 20px;">
        @csrf
        <label>Requested Role:</label><br>
        <input type="text" name="requested_role" required><br><br>
        <button type="submit">🔒 Send Role Request</button>
    </form>

@endif

</body>
</html>
