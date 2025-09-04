<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index()
    {
        // Atgriež ar lapošanu (pielāgo 'per_page' ar ?per_page=)
        return Product::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price'       => ['required', 'numeric', 'min:0'],
            'status'      => ['required', 'in:active,inactive'],
        ]);

        $product = Product::create($data);
        return response()->json($product, Response::HTTP_CREATED);  
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name'        => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price'       => ['sometimes', 'required', 'numeric', 'min:0'],
            'status'      => ['sometimes', 'required', 'in:active,inactive'],
        ]);

        $product->update($data);
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
