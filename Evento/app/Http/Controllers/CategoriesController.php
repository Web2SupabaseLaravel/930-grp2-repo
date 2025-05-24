<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoriesController extends Controller
{

    public function index()
    {
        $data['categories'] = \App\Models\Categories::all();
        return $data;
    }
}
