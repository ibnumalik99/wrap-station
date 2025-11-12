<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Car Report</title>
    <script src="https://cdn.tailwindcss.com"></script> <!-- Tailwind CDN -->
    <style>
        .page-break {
        page-break-before: always;
        break-before: page;
        }
    </style>
</head>
<body class="p-8 font-sans">
    <div class="max-w-4xl mx-auto bg-white">
        <div class="grid grid-cols-4 mb-2 border-b-4 pb-4 border-black">
          <div class="col-span-3 text-2xl font-bold mt-auto mb-6">
            WrapStation
          </div>
          <div class="border-4 border-black">
            <h1 class="text-2xl font-bold text-center">INSPECTION <br>REPORT</h1>
          </div>
        </div>

        <div class="flex gap-2 mb-6">
            <div class="flex-1 p-4">
              <div class="flex">
                <div class="flex-1 text-sm font-medium text-gray-900">
                  CUSTOMER
                </div>
                <div class="flex-1 text-sm font-medium text-gray-900">
                  : {{ $customer->front_name . " " . $customer->last_name }}
                </div>
              </div>
              <div class="flex">
                <div class="flex-1 text-sm font-medium text-gray-900">
                  INSPECTOR
                </div>
                <div class="flex-1 text-sm font-medium text-gray-900">
                  : {{ $user->name }}
                </div>
              </div>
            </div>

            <div class="flex-1 text-sm font-medium text-gray-900 p-4">
              <div class="flex">
                <div class="flex-1 text-sm font-medium text-gray-900">
                  DATE
                </div>
                <div class="flex-1 text-sm font-medium text-gray-900">
                  : {{ $car->inspection_date }}
                </div>
              </div>
              <div class="flex">
                <div class="flex-1 text-sm font-medium text-gray-900">
                  LOCATION
                </div>
                <div class="flex-1 text-sm font-medium text-gray-900">
                  : {{ $customer->location }}
                </div>
              </div>
            </div>
        </div>

        <div class="mb-4">
          <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase border-y-4 border-black">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                            ITEM
                          </th>
                          <th scope="col" class="px-6 py-3">
                            LICENSE PLAT
                          </th>
                          <th scope="col" class="px-6 py-3">
                            MILEAGE (KM)
                          </th>
                      </tr>
                  </thead>
                  <tbody class="border-b-4 border-black">
                      <tr class="bg-white">
                          <td class="px-6 py-2">
                            {{ $car->brand . " " . $car->model }}
                          </td>
                          <td class="px-6 py-2">
                            {{ $car->license_plat }}
                          </td>
                          <td class="px-6 py-2">
                            {{ $car->mileage }}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>

        <div class="text-sm font-medium text-gray-900 uppercase mb-6">
          item inspection
        </div>

        <div class="mb-4">
          <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase border-y-4 border-black">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                            article
                          </th>
                          <th scope="col" class="px-6 py-3">
                            conditions
                          </th>
                          <th scope="col" class="px-6 py-3">
                            notes
                          </th>
                      </tr>
                  </thead>
                  <tbody class="border-b-4 border-black">
                    <tr class="bg-white">
                        <td>
                        </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                              <div class="px-2">G</div>
                              <div class="px-2">F</div>
                              <div class="px-2">P</div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                        </td>
                    </tr>
                    
                    <tr class="bg-white">
                        <td class="px-6 py-2">
                            Paint
                        </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->paint == 'G' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->paint == 'F' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->paint == 'P' ? 'bg-gray-700' : '' }}"></div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                            {{ $parts[0]->note_paint }}
                        </td>
                    </tr>
                    <tr class="bg-white">
                        <td class="px-6 py-2">
                            Windshield
                        </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->wind_shiel == 'G' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->wind_shiel == 'F' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->wind_shiel == 'P' ? 'bg-gray-700' : '' }}"></div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                            {{ $parts[0]->note_wind_shiel }}
                        </td>
                    </tr>
                    <tr class="bg-white">
                        <td class="px-6 py-2">
                            Windows
                        </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->windows == 'G' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->windows == 'F' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->windows == 'P' ? 'bg-gray-700' : '' }}"></div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                            {{ $parts[0]->note_windows }}
                        </td>
                    </tr>
                    <tr class="bg-white">
                        <td class="px-6 py-2">
                            Mirrors
                        </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->mirrors == 'G' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->mirrors == 'F' ? 'bg-gray-700' : '' }}"></div>
                              <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->mirrors == 'P' ? 'bg-gray-700' : '' }}"></div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                            {{ $parts[0]->note_mirrors }}
                        </td>
                    </tr>
                    <tr class="bg-white">
                        <td class="px-6 py-2">
                          Rear Windows
                        </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->rear_windows == 'G' ? 'bg-gray-700' : '' }}"></div>
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->rear_windows == 'F' ? 'bg-gray-700' : '' }}"></div>
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->rear_windows == 'P' ? 'bg-gray-700' : '' }}"></div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                            {{ $parts[0]->note_rear_windows }}
                        </td>
                    </tr>
                    <tr class="bg-white">
                      <td class="px-6 py-2">
                        Tires 
                      </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->tires == 'G' ? 'bg-gray-700' : '' }}"></div>
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->tires == 'F' ? 'bg-gray-700' : '' }}"></div>
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->tires == 'P' ? 'bg-gray-700' : '' }}"></div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                            {{ $parts[0]->note_tires }}
                        </td>
                    </tr>
                    <tr class="bg-white">
                      <td class="px-6 py-2">
                        Wheels
                      </td>
                        <td class="px-6 py-2">
                            <div class="flex justify-between">
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->wheels == 'G' ? 'bg-gray-700' : '' }}"></div>
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->wheels == 'F' ? 'bg-gray-700' : '' }}"></div>
                                <div class="border h-5 w-5 border-gray-400 {{ $parts[0]->wheels == 'P' ? 'bg-gray-700' : '' }}"></div>
                            </div>
                        </td>
                        <td class="px-6 py-2">
                            {{ $parts[0]->note_wheels }}
                        </td>
                    </tr>
                  </tbody>
              </table>
          </div>
        </div>

        <div class="mb-8">
          <p class="uppercase italic">Remarks :</p>
          <p class="italic">G = GOOD = This item is in good conditional and/or in performing to standard.</p>
          <p class="italic">F = FAIR = This item is in fair conditional and/or in performing adequately.</p>
          <p class="italic">P = POOR = This item is in poor conditional and/or in performing below standard.</p>
        </div>
        <div class="page-break"></div>

        <div class="grid grid-cols-4 mb-4 border-b-4 pb-4 border-black mt-6">
            <div class="col-span-3 text-2xl font-bold mt-auto mb-6">
            WrapStation
            </div>
            <div class="border-4 border-black">
            <h1 class="text-2xl font-bold text-center">INSPECTION <br>REPORT</h1>
            </div>
        </div>
        <div class="border-b-4 border-black uppercase mb-6 pb-4 text-sm font-medium text-gray-900">Car</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($car->front_view)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $car->front_view) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
            <div class="max-w-6xl w-full rounded-lg">
                @if ($car->back_view)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $car->back_view) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
            <div class="max-w-6xl w-full rounded-lg">
                @if ($car->left_view)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $car->left_view) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
            <div class="max-w-6xl w-full rounded-lg">
                @if ($car->right_view)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $car->right_view) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="border-y-4 border-black uppercase mb-6 py-4 text-sm font-medium text-gray-900">1. Paint</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($parts[0]->image_paint)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $parts[0]->image_paint) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="page-break"></div>
        <div class="grid grid-cols-4 mb-4 border-b-4 pb-4 border-black mt-6">
            <div class="col-span-3 text-2xl font-bold mt-auto mb-6">
                WrapStation
            </div>
            <div class="border-4 border-black">
                <h1 class="text-2xl font-bold text-center">INSPECTION <br>REPORT</h1>
            </div>
        </div>
        <div class="border-b-4 border-black uppercase mb-6 py-4 text-sm font-medium text-gray-900">2. Windshield</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($parts[0]->image_wind_shiel)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $parts[0]->image_wind_shiel) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="border-y-4 border-black uppercase mb-6 py-4 text-sm font-medium text-gray-900">3. Windows</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($parts[0]->image_windows)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $parts[0]->image_windows) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="border-y-4 border-black uppercase mb-6 py-4 text-sm font-medium text-gray-900">4. Mirror</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($parts[0]->image_mirrors)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $parts[0]->image_mirrors) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="page-break"></div>
        <div class="grid grid-cols-4 mb-4 border-b-4 pb-4 border-black mt-6">
            <div class="col-span-3 text-2xl font-bold mt-auto mb-6">
                WrapStation
            </div>
            <div class="border-4 border-black">
                <h1 class="text-2xl font-bold text-center">INSPECTION <br>REPORT</h1>
            </div>
        </div>
        <div class="border-b-4 border-black uppercase mb-6 py-4 text-sm font-medium text-gray-900">5. Rear Window</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($parts[0]->image_rear_windows)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $parts[0]->image_rear_windows) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="border-y-4 border-black uppercase mb-6 py-4 text-sm font-medium text-gray-900">6. Tires</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($parts[0]->image_tires)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $parts[0]->image_tires) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="border-y-4 border-black uppercase mb-6 py-4 text-sm font-medium text-gray-900">7. Wheels</div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <div class="max-w-6xl w-full rounded-lg">
                @if ($parts[0]->image_wheels)
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="{{ public_path('storage/' . $parts[0]->image_paint) }}"
                        alt="Front View"
                    >
                @else
                    <img 
                        class="max-h-64 max-w-full rounded-lg"
                        src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        alt="image description">
                @endif
            </div>
        </div>
    
        <div class="page-break"></div>
        <div class="grid grid-cols-4 mb-4 border-b-4 pb-4 border-black mt-6">
            <div class="col-span-3 text-2xl font-bold mt-auto mb-6">
                WrapStation
            </div>
            <div class="border-4 border-black">
                <h1 class="text-2xl font-bold text-center">INSPECTION <br>REPORT</h1>
            </div>
        </div>
        <p class="uppercase italic">terms and conditions :</p>
        <div class="mb-4 px-4">
            <p class="italic">1. Kondisi kendaraan dapat berubah setelah pembersihan. Tim akan menginformasikan jika ada perubahan.</p>
            <p class="italic">2. Status cat kendaraan (repeint/original) tidak dapat di pastikan, resiko ditanggung pemilik.</p>
            <p class="italic">3. Penambahan jarak tempuh (mileage) bisa terjadi, dan bukan tanggung jawab Wpar Station.</p>
            <p class="italic">4. Kerusakan/malfungsi mesin selama atau setelah pengerjaan bukan tanggung jawab kami.</p>
            <p class="italic">5. Kerusakan akibat pembongkaran aksesoris oleh pihak lain bukan tanggung jawab kami.</p>
            <p class="italic">6. Kehilangan barang pribadi bukan tanggung jawab Wrap Station. Harap kosongkan kendaraan.</p>
            <p class="italic">7. Wrap Station berhak melakukan tindakan teknis bila diperlukan dan di setujui sebelumnya.</p>
            <p class="italic">8. Kondisi/modifikasi khusus yang tidak diinformasikan menjadi tanggung jawab pemilik.</p>
            <p class="italic">9. Penurunan berat EV adalah kondisi alami, bukan tanggung jawab kami.</p>
            <p class="italic">10. Estimasi pengerjaan dapat berubah, keterlambatan akan diinformasikan ke pelanggan.</p>
        </div>
        <p class="mt-2">Degan ini, saya <b>{{ $customer->front_name . " " . $customer->last_name }}</b> menyatakan setuju dengan semua <b>syarat dan ketentuan dari WrapStation</b>.</p>
    </div>

</body>
</html>
