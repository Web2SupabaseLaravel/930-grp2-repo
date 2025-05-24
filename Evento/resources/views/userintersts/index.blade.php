<div class="mb-3 text-end">
    <a href="{{ route('userintersts.create') }}" class="btn btn-success">Add new interests</a>
</div>

<ul class="list-group">
    @foreach($categories as $category)
        <li class="list-group-item d-flex justify-content-between align-items-center">

            <div>
                ID: {{ $category->id }},
                Category ID: {{ $category->categorie_id }},
                User ID: {{ $category->user_id }}
            </div>

            <div>
                <!-- زر التعديل -->
                <a href="{{ route('userintersts.edit', $category->id) }}" class="btn btn-sm btn-primary me-2">Edit</a>

                <!-- زر الحذف -->
                <form action="{{ route('userintersts.destroy', $category->id) }}" method="POST" style="display:inline-block;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-sm btn-danger"
                        onclick="return confirm('هل أنت متأكد من حذف هذا العنصر؟');">
                        Delete
                    </button>
                </form>
            </div>
        </li>
    @endforeach
</ul>
