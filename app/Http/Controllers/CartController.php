<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render('Cart');
    }

    public function checkOut(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
        ]);

        $total = self::getTotalFromCart($validated['items']);

        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'total' => $total,
            'paid_at' => now(),
        ]);

        return redirect()->back()->with([
            'success' => 'Transaction created successfully.',
            'transaction' => $transaction,
        ]);
    }

    public static function getTotalFromCart($cart)
    {
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['qty'];
        }

        return $total;
    }
}
