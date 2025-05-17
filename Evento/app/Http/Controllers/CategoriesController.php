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

    public function store(Request $request)
    {

    $request->validate([
        'categories_name' => 'required',
        'id' => 'required',
    ]);

    $inputEvent = new \App\Models\Event();
    $inputEvent->categories_name = $request->categories_name;
    $inputEvent->id = $request->id;
    $inputEvent->save();
    return redirect('datacategories');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


}
