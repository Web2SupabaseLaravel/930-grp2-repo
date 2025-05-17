<?php

namespace App\Http\Controllers;
use App\Models\Tickets;
use Illuminate\Http\Request;
class TicketsController extends Controller{

    public function index(Request $request){
        $user=$request->user();
        if($user->profile->role==='Admin'){
                    $tickets=Tickets::all();

            return view('tickets.index', compact('tickets'));
        }

            $tickets=Tickets::where('user_id',$user->id)->get();

            return view('tickets.index', compact('tickets'));

    }









}