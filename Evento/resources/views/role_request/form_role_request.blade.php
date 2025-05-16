<!DOCTYPE html>
<html>
<head>
    <title>{{ $titleForm ?? 'Role Request' }}</title>
    <style>
        /* إعداد الجسم: خلفية هادئة، ونموذج في وسط الشاشة */
        body {
            margin: 0;
            height: 100vh;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        /* الصندوق الرئيسي */
        form {
            background: white;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            max-width: 480px;
            width: 100%;
            box-sizing: border-box;
        }

        h1 {
            color: #222;
            text-align: center;
            margin-bottom: 25px;
            font-weight: 700;
            font-size: 28px;
            letter-spacing: 0.5px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #444;
        }

        input[type="text"],
        input[type="number"],
        select {
            width: 100%;
            padding: 10px 14px;
            margin-bottom: 20px;
            border: 1.8px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        input[type="text"]:focus,
        input[type="number"]:focus,
        select:focus {
            border-color: #4a90e2;
            box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
            outline: none;
        }

        button {
            background-color: #4a90e2;
            color: white;
            font-weight: 700;
            padding: 12px 0;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1.1rem;
            width: 100%;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #357abd;
        }

        .errors {
            background-color: #ffe6e6;
            border: 1.5px solid #ff4d4d;
            color: #b30000;
            padding: 12px 20px;
            margin-bottom: 25px;
            border-radius: 8px;
            font-weight: 600;
            box-sizing: border-box;
        }

        .errors ul {
            margin: 0;
            padding-left: 20px;
        }
    </style>
</head>
<body>

    <form action="{{ is_array($route) ? route($route[0], $route[1]) : route($route) }}" method="POST">
        <h1>{{ $titleForm ?? 'Role Request' }}</h1>

        @csrf
        @if($method === 'put' || $method === 'patch')
            @method('PUT')
        @endif

        @if ($errors->any())
            <div class="errors">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <label for="requested_role">Requested Role:</label>
        <input type="text" id="requested_role" name="requested_role" value="{{ old('requested_role', $roleRequest->requested_role ?? '') }}" required>

        <label for="user_id">User ID:</label>
        <input type="number" id="user_id" name="user_id" value="{{ old('user_id', $roleRequest->user_id ?? '') }}" required>

        <label for="status">Status:</label>
        <select id="status" name="status" required>
            <option value="pending" {{ old('status', $roleRequest->status ?? '') == 'pending' ? 'selected' : '' }}>Pending</option>
            <option value="accepted" {{ old('status', $roleRequest->status ?? '') == 'accepted' ? 'selected' : '' }}>Accepted</option>
            <option value="rejected" {{ old('status', $roleRequest->status ?? '') == 'rejected' ? 'selected' : '' }}>Rejected</option>
        </select>

        <button type="submit">{{ $submitButton ?? 'Submit' }}</button>
    </form>

</body>
</html>
