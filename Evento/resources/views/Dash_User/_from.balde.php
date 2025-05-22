<div class="mb-3">
    <label for="name" class="form-label">Full Name</label>
    <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror"
           value="{{ old('name', $user->name ?? '') }}">
    @error('name') <div class="invalid-feedback">{{ $message }}</div> @enderror
</div>

<div class="mb-3">
    <label for="email" class="form-label">Email Address</label>
    <input type="email" name="email" id="email" class="form-control @error('email') is-invalid @enderror"
           value="{{ old('email', $user->email ?? '') }}">
    @error('email') <div class="invalid-feedback">{{ $message }}</div> @enderror
</div>

<div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" name="password" id="password" class="form-control @error('password') is-invalid @enderror">
    @error('password') <div class="invalid-feedback">{{ $message }}</div> @enderror
</div>

<div class="mb-3">
    <label for="password_confirmation" class="form-label">Confirm Password</label>
    <input type="password" name="password_confirmation" id="password_confirmation" class="form-control">
</div>

<div class="mb-3">
    <label for="role" class="form-label">Role</label>
    <select name="role" id="role" class="form-control @error('role') is-invalid @enderror">
        <option value="">-- Select Role --</option>
        @foreach (['admin', 'organizer', 'attendee'] as $roleOption)
            <option value="{{ $roleOption }}" {{ (old('role', $user->role ?? '') == $roleOption) ? 'selected' : '' }}>
                {{ ucfirst($roleOption) }}
            </option>
        @endforeach
    </select>
    @error('role') <div class="invalid-feedback">{{ $message }}</div> @enderror
</div>

<button type="submit" class="btn btn-success">{{ $button }}</button>
