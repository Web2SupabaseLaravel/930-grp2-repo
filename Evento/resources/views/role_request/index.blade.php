<!DOCTYPE html>
<html>
<head>
    <title>Role Requests</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        body::before, body::after {
            content: "";
            position: absolute;
            border-radius: 50%;
            opacity: 0.15;
            pointer-events: none;
            z-index: 0;
        }

        body::before {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, #ff6a6a, transparent 70%);
            top: 10%;
            left: 5%;
        }

        body::after {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, #6affc1, transparent 70%);
            bottom: 15%;
            right: 10%;
        }

        .container {
            position: relative;
            background: white;
            padding: 30px 40px;
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
            width: 100%;
            max-width: 600px;
            z-index: 1;
        }

        h1 {
            margin-top: 0;
            margin-bottom: 25px;
            color: #222;
            text-align: center;
            font-weight: 700;
            font-size: 28px;
            letter-spacing: 1px;
        }

        .success {
            background-color: #e6ffed;
            border: 1px solid #b5e2c1;
            color: #2f8f46;
            padding: 10px 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        th {
            background-color: #f9f9f9;
            font-weight: 600;
            color: #555;
        }

        tr:last-child td {
            border-bottom: none;
        }

        .actions a, .actions button {
            margin-right: 10px;
            font-size: 14px;
            text-decoration: none;
            color: #3a5afe;
            border: none;
            background: none;
            cursor: pointer;
            font-weight: 600;
            transition: color 0.25s ease;
        }

        .actions a:hover, .actions button:hover {
            color: #1a3ddb;
            text-decoration: underline;
        }

        .actions button {
            color: #e53935;
        }

        form[action*="store"] {
            margin-top: 10px;
        }

        label {
            font-weight: 600;
            color: #333;
        }

        input[type="text"] {
            width: 100%;
            padding: 10px 14px;
            margin-top: 6px;
            border-radius: 8px;
            border: 1.5px solid #ccc;
            font-size: 15px;
            transition: border-color 0.3s ease;
        }

        input[type="text"]:focus {
            outline: none;
            border-color: #3a5afe;
            box-shadow: 0 0 8px rgba(58, 90, 254, 0.4);
        }

        button[type="submit"] {
            margin-top: 18px;
            background-color: #3a5afe;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 700;
            width: 100%;
            transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
            background-color: #1a3ddb;
        }

        @media (max-width: 640px) {
            .container {
                padding: 25px 20px;
                width: 90%;
            }

            table, th, td {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Role Requests</h1>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    {{-- تحقق صلاحية الادمن عن طريق profile.role --}}
    @php
        $profile = auth()->user()->profile ?? null;
    @endphp

    @if ($profile && $profile->role === 'admin')

        {{-- جدول الطلبات مع أزرار التعديل والحذف --}}
        <table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Requested Role</th>
        <th>Status</th>
        <th>User ID</th>  
        <th>Actions</th>
    </tr>
</thead>

           <tbody>
    @forelse ($roleRequests as $item)
        <tr>
            <td>{{ $item->id }}</td> 
            <td>{{ $item->requested_role }}</td>
            <td>{{ $item->status }}</td>
            <td>{{ $item->user_id }}</td>
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
        <tr><td colspan="5" style="text-align:center;">No role requests found.</td></tr>
    @endforelse
</tbody>

        </table>

    @else

        {{-- نموذج طلب رتبة للمستخدم العادي --}}
        <form action="{{ route('rolerequest.store') }}" method="POST" style="margin-top: 20px;">
            @csrf
            <label for="requested_role">Requested Role:</label>
            <input type="text" id="requested_role" name="requested_role" required>
            <button type="submit">🔒 Send Role Request</button>
        </form>

    @endif
</div>

</body>
</html>
