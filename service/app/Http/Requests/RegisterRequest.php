<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:1|regex:/^[A-Za-z]{1,}$/',
            'surname' => 'required|min:1|regex:/^[A-Za-z]{1,}$/',
            'e_mail' => 'required|email|unique:users',
            'username' => 'required|unique:users|min:1|regex:/^[A-Za-z0-9]{1,}$/',
            'password' => 'required|confirmed|min:1|regex:/^[A-Za-z0-9]{1,}$/|same:password_confirmation'
        ];
    }

    public function messages()
    {
        return [
            'e_mail.unique' => 'Użytkownik o takim adresie e-mail już istnieje!',
            'username.unique' => 'Użytkownik o takim loginie już istnieje!',
            'password.same' => 'Wprowadzone hasła nie są takie same!',
            'name.regex' => 'W polu imię wystapiły niedozwolone znaki!',
            'surname.regex' => 'W polu nazwisko wystapiły niedozwolone znaki!',
            'username.regex' => 'W polu login wystapiły niedozwolone znaki!',
            'password.regex' => 'W polu hasło wystapiły niedozwolone znaki!',
        ];
    }

    public function filters()
    {
        return [
            'e_mail' => 'trim|lowercase',
            'name' => 'trim|capitalize|escape',
            'surname' => 'trim|capitalize|escape',
            'password' => 'trim|escape',
            'user' => 'trim|escape'
        ];
    }
}
