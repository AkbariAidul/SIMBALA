<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'report_category_id' => 'required|exists:report_categories,id',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'required|string',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'address' => 'required|string',
        ];
    }
}
