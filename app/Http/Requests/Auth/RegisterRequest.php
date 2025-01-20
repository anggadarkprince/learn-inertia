<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'name' => 'required|max:100',
            'username' => ['required', 'min:3', 'max:30', "regex:/^[a-zA-Z0-9_\-.]+$/", Rule::unique(User::class, 'username')],
            'email' => ['required', 'max:50', Rule::unique(User::class, 'email')],
            'password' => ['required', 'confirmed', Password::min(5)],
            'password_confirmation' => 'sometimes|required',
            'agreement' => 'accepted',
        ];
    }
}
