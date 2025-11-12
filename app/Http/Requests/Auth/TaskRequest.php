<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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
            // CUSTOMER
            'customer.front_name' => ['required', 'string', 'max:100'],
            'customer.last_name' => ['nullable', 'string', 'max:100'],
            'customer.phone' => ['required', 'string', 'max:20'],
            'customer.location' => ['required', 'string', 'max:255'],

            // CAR
            'car.brand' => ['required', 'string', 'max:100'],
            'car.model' => ['required', 'string', 'max:100'],
            'car.color' => ['required', 'string', 'max:50'],
            'car.years' => ['required', 'numeric'],
            'car.license_plat' => ['required', 'string', 'max:20'],
            'car.inpection_date' => ['nullable', 'date'],
            'car.miliage' => ['nullable', 'numeric'],
            'car.right_view' => ['nullable', 'file', 'image'],
            'car.left_view' => ['nullable', 'file', 'image'],
            'car.front_view' => ['nullable', 'file', 'image'],
            'car.back_view' => ['nullable', 'file', 'image'],

            // PART (ENUM G/F/P + note + image)
            'part.paint' => ['required', 'in:G,F,P'],
            'part.note_paint' => ['nullable', 'string'],
            'part.image_paint' => ['nullable', 'file', 'image'],

            'part.wind_shiel' => ['required', 'in:G,F,P'],
            'part.note_wind_shiel' => ['nullable', 'string'],
            'part.image_wind_shiel' => ['nullable', 'file', 'image'],

            'part.windows' => ['required', 'in:G,F,P'],
            'part.note_windows' => ['nullable', 'string'],
            'part.image_windows' => ['nullable', 'file', 'image'],

            'part.mirrors' => ['required', 'in:G,F,P'],
            'part.note_mirrors' => ['nullable', 'string'],
            'part.image_mirrors' => ['nullable', 'file', 'image'],

            'part.rear_windows' => ['required', 'in:G,F,P'],
            'part.note_rear_windows' => ['nullable', 'string'],
            'part.image_rear_windows' => ['nullable', 'file', 'image'],

            'part.tires' => ['required', 'in:G,F,P'],
            'part.note_tires' => ['nullable', 'string'],
            'part.image_tires' => ['nullable', 'file', 'image'],

            'part.wheels' => ['required', 'in:G,F,P'],
            'part.note_wheels' => ['nullable', 'string'],
            'part.image_wheels' => ['nullable', 'file', 'image'],
        ];
    }
}
