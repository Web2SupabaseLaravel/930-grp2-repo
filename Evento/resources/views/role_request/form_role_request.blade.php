<!DOCTYPE html>
<html>
<head>
    <title>{{ $titleForm }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .form-container {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            width: 400px;
        }
        label {
            display: block;
            margin-top: 15px;
            font-weight: 600;
            color: #333;
        }
        input[type="text"], select {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            border-radius: 8px;
            border: 1.5px solid #ccc;
            font-size: 15px;
        }
        button {
            margin-top: 25px;
            width: 100%;
            background: #3a5afe;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background: #1a3ddb;
        }
    </style>
</head>
<body>

<div class="form-container">
    <h2>{{ $titleForm }}</h2>

    <form action="{{ is_array($route) ? route($route[0], $route[1]) : route($route) }}" method="POST">
        @csrf
        @if($method !== 'post')
            @method($method)
        @endif

        {{-- عرض رقم المستخدم --}}  
        <label>User ID</label>
        <input type="text" value="{{ $roleRequest->user_id ?? '' }}" readonly>

        {{-- عرض الرتبة المطلوبة --}}
        <label>Requested Role</label>
        <input type="text" value="{{ $roleRequest->requested_role ?? '' }}" readonly>

        {{-- تعديل الحالة --}}
        <label>Status</label>
        <select name="status" required>
            <option value="pending" {{ (isset($roleRequest) && $roleRequest->status == 'pending') ? 'selected' : '' }}>Pending</option>
            <option value="accepted" {{ (isset($roleRequest) && $roleRequest->status == 'accepted') ? 'selected' : '' }}>Accepted</option>
            <option value="rejected" {{ (isset($roleRequest) && $roleRequest->status == 'rejected') ? 'selected' : '' }}>Rejected</option>
        </select>

        <button type="submit">{{ $submitButton }}</button>
    </form>
</div>

</body>
</html>
