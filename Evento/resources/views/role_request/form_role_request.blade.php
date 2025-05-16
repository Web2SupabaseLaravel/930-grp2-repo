<!DOCTYPE html>
<html>
<head>
    <title>{{ $titleForm ?? 'Role Request' }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f7f7f7;
        }
        h1 {
            color: #333;
        }
        form {
            background: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgb(0 0 0 / 0.1);
            max-width: 500px;
        }
        label {
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
            color: #555;
        }
        input[type="text"],
        input[type="number"],
        select {
            width: 100%;
            padding: 8px 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }
        input[type="text"]:focus,
        input[type="number"]:focus,
        select:focus {
            border-color: #007BFF;
            outline: none;
        }
        button {
            background-color: #007BFF;
            color: white;
            font-weight: bold;
            padding: 10px 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #0056b3;
        }
        .errors {
            background-color: #ffe6e6;
            border: 1px solid #ff4d4d;
            color: #b30000;
            padding: 10px 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .errors ul {
            margin: 0;
            padding-left: 20px;
        }
    </style>
</head>
<body>

    <h1>{{ $titleForm ?? 'Role Request' }}</h1>

    @if ($errors->any())
        <div class="errors">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

<form action="{{ is_array($route) ? route($route[0], $route[1]) : route($route) }}" method="POST">
        @csrf
        @if($method === 'put' || $method === 'patch')
            @method('PUT')
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
