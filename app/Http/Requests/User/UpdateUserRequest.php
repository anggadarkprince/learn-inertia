<?php

namespace App\Http\Requests\User;

use App\Enums\UserStatus;
use App\Enums\UserType;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
        $uniqueUsernameRule = Rule::unique(User::class, 'username')->ignore($this->route('user'));
        $uniqueEmailRule = Rule::unique(User::class, 'email')->ignore($this->route('user'));

        return [
            'name' => 'required|max:100',
            'username' => ['required', 'min:3', 'max:30', "regex:/^[a-zA-Z0-9_\-.]+$/", $uniqueUsernameRule],
            'email' => ['required', 'max:50', $uniqueEmailRule],
            'avatar' => [
                'nullable',
                File::image()
                    ->max('2mb')
                    ->dimensions(Rule::dimensions()->maxWidth(3000)->maxHeight(3000)),
            ],
            'password' => [$this->filled('password') ? 'confirmed' : 'nullable', Password::min(5)],
            'roles' => 'nullable|array',
            'role' => [Rule::in(['user', 'admin'])],
        ];
    }

    public function messages()
    {
        return [
            'username.regex' => 'Username only alphanumeric dash and period',
        ];
    }
}
