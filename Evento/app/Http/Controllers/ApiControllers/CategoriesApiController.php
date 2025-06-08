<?php

namespace App\Http\Controllers\ApiControllers;

use Illuminate\Http\Request;

class CategoriesApiController extends Controller
{
    public function index()
    {
        $categories = \App\Models\Categories::all();
        return response()->json([
            'categories' => $categories
        ]);
    }
}
