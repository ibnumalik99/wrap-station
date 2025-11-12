<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Part;
use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Auth\TaskRequest;
use Spatie\Browsershot\Browsershot;

class UserController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('Dashboard', [
            'user' => $user
        ]);
    }

    public function submit(TaskRequest $request)
    {
        DB::beginTransaction();
        try {
            $customer = Customer::create($request->customer);

            // Upload img car
            $carData = $request->car;

            if (isset($request->car['right_view'])) {
                $carData['right_view'] = $request->car['right_view']->store('cars', 'public');
            }
            if (isset($request->car['left_view'])) {
                $carData['left_view'] = $request->car['left_view']->store('cars', 'public');
            }
            if (isset($request->car['front_view'])) {
                $carData['front_view'] = $request->car['front_view']->store('cars', 'public');
            }
            if (isset($request->car['back_view'])) {
                $carData['back_view'] = $request->car['back_view']->store('cars', 'public');
            }

            $carData['user_id'] = auth()->id();
            $car = $customer->cars()->create($carData);

            // Upload img parts
            $partData = $request->part;

            foreach ($partData as $key => $value) {
                if (str_starts_with($key, 'image_') && $value instanceof \Illuminate\Http\UploadedFile) {
                    $partData[$key] = $value->store('parts', 'public');
                }
            }

            $car->parts()->create($partData);

            redirect()->route('car.print', $car->id);
            DB::commit();

            return response()->json([
                'message' => 'Data berhasil disimpan',
                'id' => $car->id,
                'print_url' => route('car.print', $car->id),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors($e->getMessage());
        }
    }

    public function print($carId)
    {
        set_time_limit(120); // biar gak timeout

        $car = Car::with(['customer', 'parts', 'user'])->findOrFail($carId);

        $html = view('pdf.car_report', [
            'car' => $car,
            'customer' => $car->customer,
            'parts' => $car->parts,
            'user' => $car->user,
        ])->render();

        $pdfPath = storage_path("app/public/report-{$car->id}.pdf");

        Browsershot::html($html)
            ->setNodeBinary('C:\Program Files\nodejs\node.exe')
            ->setNpmBinary('C:\Program Files\nodejs\npm.cmd')
            ->setOption('args', ['--no-sandbox'])
            ->setOption('executablePath', 'C:\Program Files\Google\Chrome\Application\chrome.exe')
            ->setOption('waitUntil', 'networkidle0')
            ->setOption('timeout', 120000)
            ->setOption('baseUrl', config('app.url')) // penting agar url('storage/...') bisa terbaca
            ->showBackground()
            ->emulateMedia('print')
            ->format('A4')
            ->save($pdfPath);

        return response()->file($pdfPath);
    }
}
