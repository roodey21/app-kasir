<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama produk harus diisi.',
            'category_id.required' => 'Kategori harus diisi.',
            'category_id.exists' => 'Kategori tidak ditemukan.',
            'price.required' => 'Harga produk harus diisi.',
            'image.required' => 'Harap masukkan foto produk.',
            'image.image' => 'Hanya diperbolehkan untuk mengupload foto saja.',
            'image.mimes' => 'Format yang diperbolehkan hanya jpg dan png.',
            'image.max' => 'Ukuran foto maksimal 2MB.',
        ];
    }
}
