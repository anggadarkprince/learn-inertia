<?php

namespace App\Http\Requests\Schedule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreScheduleRequest extends FormRequest
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
            'date' => ['required', 'date', Rule::unique('schedules')->where(function ($query) {
                return $query
                    ->where('category_id', $this->category_id)
                    ->where('pic_id', $this->pic_id);
            })],
            'category_id' => 'required|exists:categories,id',
            'pic_id' => 'required|exists:users,id',
            'description' => 'nullable|max:500',
        ];
    }

    public function messages()
    {
        return [
            'date.unique' => 'The date has been already taken with same category and PIC.'
        ];
    }
}
