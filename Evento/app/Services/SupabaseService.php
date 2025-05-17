<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SupabaseService
{
    protected $url;
    protected $key;

    public function __construct()
    {
        $this->url = rtrim(env('SUPABASE_URL'), '/') . '/rest/v1';
        $this->key = env('SUPABASE_KEY');
    }

    public function getUserProfile($userId)
    {
        $response = Http::withHeaders([
            'apikey' => $this->key,
            'Authorization' => 'Bearer ' . $this->key,
        ])->get("{$this->url}/profile", [
            'user_id' => "eq.{$userId}",
            'select' => '*'
        ]);

        if ($response->successful() && count($response->json()) > 0) {
            return (object) $response->json()[0];
        }

        return null;
    }
}
