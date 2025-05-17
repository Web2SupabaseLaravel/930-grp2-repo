<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('قائمة التذاكر') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    @if($tickets->isEmpty())
                        <p>لا يوجد تذاكر حالياً.</p>
                    @else
                        <table class="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                            <thead class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th class="border px-4 py-2">#</th>
                                    <th class="border px-4 py-2">اسم الحدث</th>
                                    <th class="border px-4 py-2">اسم المستخدم</th>
                                    <th class="border px-4 py-2">الحالة</th>
                                    @if(auth()->user()->type === 'Admin')
                                        <th class="border px-4 py-2">الإجراءات</th>
                                    @endif
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($tickets as $ticket)
                                    <tr>
                                        <td class="border px-4 py-2">{{ $ticket->id }}</td>
                                        <td class="border px-4 py-2">{{ $ticket->event->event_name ?? 'غير معروف' }}</td>
                                        <td class="border px-4 py-2">{{ $ticket->user->name ?? 'غير معروف' }}</td>
                                        <td class="border px-4 py-2">{{ $ticket->Status }}</td>
                                        @if(auth()->user()->type === 'Admin')
                                            <td class="border px-4 py-2">
                                                <a href="{{ route('tickets.edit', $ticket->id) }}" class="text-blue-500 hover:underline">تعديل</a>
                                                <form action="{{ route('tickets.destroy', $ticket->id) }}" method="POST" class="inline-block ml-2" onsubmit="return confirm('هل أنت متأكد من الحذف؟');">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="text-red-500 hover:underline">حذف</button>
                                                </form>
                                            </td>
                                        @endif
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
