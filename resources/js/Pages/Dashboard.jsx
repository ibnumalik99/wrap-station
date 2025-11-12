import React from "react";
import {useState} from "react"
import { Head, router, usePage } from "@inertiajs/react";
import Auth from "../Layouts/Auth";
import Button from "../Components/Button";
import axios from "axios";

const Dashboard = () => {
    // const {errors} = usePage().props
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState('page1');
    const [values, setValues] = useState({
        confirm_terms: false,
        customer: {
            front_name: "",
            last_name: "",
            phone: "",
            location: ""
        },
        car: {
            brand: '',
            model: '',
            color: '',
            years: '',
            license_plat: '',
            inspection_date: '',
            mileage: '',
            right_view: null,
            left_view: null,
            front_view: null,
            back_view: null
        },
        part: {
            paint: 'G',
            note_paint: '',
            image_paint: null,
            wind_shiel: 'G',
            note_wind_shiel: '',
            image_wind_shiel: null,
            windows: 'G',
            note_windows: '',
            image_windows: null,
            mirrors: 'G',
            note_mirrors: '',
            image_mirrors: null,
            rear_windows: 'G',
            note_rear_windows: '',
            image_rear_windows: null,
            tires: 'G',
            note_tires: '',
            image_tires: null,
            wheels: 'G',
            note_wheels: '',
            image_wheels: null,
        }
    })

    const [preview, setPreview] = useState({
        front_view: null,
        left_view: null,
        right_view: null,
        back_view: null,
    });


    function handleChange(e) {
        let value = e.target.type === "file" ? e.target.files[0] : e.target.value;
        const [group, key] = e.target.name.split(".");

        setValues((prev) => ({
            ...prev,
            [group]: {
                ...prev[group],
                [key]: value,
            },
        }));

        // jika file → buat preview
        if (e.target.type === "file") {
            setPreview((prev) => ({
                ...prev,
                [key]: URL.createObjectURL(e.target.files[0])
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // ========== CUSTOMER ==========
            Object.entries(values.customer).forEach(([key, val]) => {
                formData.append(`customer[${key}]`, val ?? '');
            });

            // ========== CAR ==========
            Object.entries(values.car).forEach(([key, val]) => {
                if (val instanceof File) {
                    formData.append(`car[${key}]`, val);
                } else {
                    formData.append(`car[${key}]`, val ?? '');
                }
            });

            // ========== PART ==========
            Object.entries(values.part).forEach(([key, val]) => {
                if (val instanceof File) {
                    formData.append(`part[${key}]`, val);
                } else {
                    formData.append(`part[${key}]`, val ?? '');
                }
            });

            // ========== CONFIRM TERMS ==========
            formData.append('confirm_terms', values.confirm_terms ? 1 : 0);

            // ========== KIRIM REQUEST ==========
            const res = await axios.post('/form', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert(res.data.message);

            // buka halaman print di tab baru
            window.open(res.data.print_url, '_blank');

            // redirect ke dashboard
            window.location.href = '/dashboard';

        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat mengirim data!');
        }
    };

    return (
        <div className="p-8">
            <Head>
                <title>{`Dashboard`}</title>
            </Head>

            <div className="flex justify-center">
                <div className="max-w-[80%] w-full p-3 border border-gray-300 rounded-lg">    
                    <div className="inline-flex rounded-md shadow-xs" role="group">
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg
                                hover:bg-gray-100 focus:z-10 
                                ${page === "page1" 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-gray-900"}`
                            }
                            onClick={() => setPage('page1')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-7">
                                <path fill={page== 'page1'? 'white' : 'gray-700'} d="M199.2 181.4L173.1 256L466.9 256L440.8 181.4C436.3 168.6 424.2 160 410.6 160L229.4 160C215.8 160 203.7 168.6 199.2 181.4zM103.6 260.8L138.8 160.3C152.3 121.8 188.6 96 229.4 96L410.6 96C451.4 96 487.7 121.8 501.2 160.3L536.4 260.8C559.6 270.4 576 293.3 576 320L576 512C576 529.7 561.7 544 544 544L512 544C494.3 544 480 529.7 480 512L480 480L160 480L160 512C160 529.7 145.7 544 128 544L96 544C78.3 544 64 529.7 64 512L64 320C64 293.3 80.4 270.4 103.6 260.8zM192 368C192 350.3 177.7 336 160 336C142.3 336 128 350.3 128 368C128 385.7 142.3 400 160 400C177.7 400 192 385.7 192 368zM480 400C497.7 400 512 385.7 512 368C512 350.3 497.7 336 480 336C462.3 336 448 350.3 448 368C448 385.7 462.3 400 480 400z"/>
                            </svg>
                        </button>

                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-200
                                hover:bg-gray-100 focus:z-10
                                ${page === "page2" 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-gray-900"}`
                            }
                            onClick={() => setPage('page2')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-7">
                                <path fill={page== 'page2'? 'white' : 'gray-700'} d="M480 576L192 576C139 576 96 533 96 480L96 160C96 107 139 64 192 64L496 64C522.5 64 544 85.5 544 112L544 400C544 420.9 530.6 438.7 512 445.3L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L480 576zM192 448C174.3 448 160 462.3 160 480C160 497.7 174.3 512 192 512L448 512L448 448L192 448zM224 216C224 229.3 234.7 240 248 240L424 240C437.3 240 448 229.3 448 216C448 202.7 437.3 192 424 192L248 192C234.7 192 224 202.7 224 216zM248 288C234.7 288 224 298.7 224 312C224 325.3 234.7 336 248 336L424 336C437.3 336 448 325.3 448 312C448 298.7 437.3 288 424 288L248 288z"/>
                            </svg>
                        </button>

                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-200
                                hover:bg-gray-100 focus:z-10
                                ${page === "page3"
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-gray-900"}`
                            }
                            onClick={() => setPage('page3')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='h-7'>
                                <path fill={page== 'page3'? 'white' : 'gray-700'} d="M128 160C128 124.7 156.7 96 192 96L512 96C547.3 96 576 124.7 576 160L576 416C576 451.3 547.3 480 512 480L192 480C156.7 480 128 451.3 128 416L128 160zM56 192C69.3 192 80 202.7 80 216L80 512C80 520.8 87.2 528 96 528L456 528C469.3 528 480 538.7 480 552C480 565.3 469.3 576 456 576L96 576C60.7 576 32 547.3 32 512L32 216C32 202.7 42.7 192 56 192zM224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160C206.3 160 192 174.3 192 192C192 209.7 206.3 224 224 224zM420.5 235.5C416.1 228.4 408.4 224 400 224C391.6 224 383.9 228.4 379.5 235.5L323.2 327.6L298.7 297C294.1 291.3 287.3 288 280 288C272.7 288 265.8 291.3 261.3 297L197.3 377C191.5 384.2 190.4 394.1 194.4 402.4C198.4 410.7 206.8 416 216 416L488 416C496.7 416 504.7 411.3 508.9 403.7C513.1 396.1 513 386.9 508.4 379.4L420.4 235.4z"/>
                            </svg>
                        </button>

                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg
                                hover:bg-gray-100 focus:z-10
                                ${page === "page4" 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-gray-900"}`
                            }
                            onClick={() => setPage('page4')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='h-7'>
                                <path fill={page== 'page4'? 'white' : 'gray-700'} d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                            </svg>
                        </button>
                    </div>

                    {page == 'page1' && (
                        <div className="flex justify-center">
                            <div className="max-w-[80%] w-full border border-gray-300 rounded-lg p-4">
                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        id="location"
                                        name="customer.location"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.customer.location}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="front_name" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Cunctomer Front Name
                                    </label>

                                    <input
                                        type="text"
                                        id="front_name"
                                        name="customer.front_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.customer.front_name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Cunctomer Last Name
                                    </label>

                                    <input
                                        type="text"
                                        id="last_name"
                                        name="customer.last_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.customer.last_name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Cunctomer Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        id="phone"
                                        name="customer.phone"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.customer.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Car Brand
                                    </label>

                                    <input
                                        type="text"
                                        id="brand"
                                        name="car.brand"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.car.brand}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Car model
                                    </label>

                                    <input
                                        type="text"
                                        id="model"
                                        name="car.model"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.car.model}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Color
                                    </label>

                                    <input
                                        type="text"
                                        id="color"
                                        name="car.color"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.car.color}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Years
                                    </label>

                                    <input
                                        type="number"
                                        id="years"
                                        name="car.years"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.car.years}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="licanse_plat" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Licanse Plat (No Spacing)
                                    </label>

                                    <input
                                        type="text"
                                        id="license_plat"
                                        name="car.license_plat"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.car.license_plat}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="inspection_date" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Inspection Date
                                    </label>

                                    <input
                                        type="date"
                                        id="inspection_date"
                                        name="car.inspection_date"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.car.inspection_date}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 mb-5">
                                    <label htmlFor="mileage" className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                        Mileage
                                    </label>

                                    <input
                                        type="number"
                                        id="mileage"
                                        name="car.mileage"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-2"
                                        required
                                        value={values.car.mileage}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {page == 'page2' && (
                        <>
                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <div className="grid grid-cols-3 mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                            Paint
                                        </label>

                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex col-span-2">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.paint"
                                                        value="G"
                                                        checked={values.part.paint === "G"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">G</span>
                                                </label>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.paint"
                                                        value="F"
                                                        checked={values.part.paint === "F"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">F</span>
                                                </label>
                                            </li>
                                            <li className="w-full">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.paint"
                                                        value="P"
                                                        checked={values.part.paint === "P"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">P</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-3/4">
                                    <textarea
                                        id="part.note_paint"
                                        name="part.note_paint"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                                border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your notes here..."
                                        value={values.part.note_paint}
                                        onChange={handleChange}
                                    ></textarea>
                                    
                                    <input
                                        type="file"
                                        id="part.image_paint"
                                        name="part.image_paint"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
                                        onChange={handleChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG.</p>
                                </div>

                            </div>

                            {/* Glass */}
                            <div className="text-center m-4 text-gray-700 text-lg font-semibold">Glass</div>
                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <div className="grid grid-cols-3 mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                            Windshield
                                        </label>

                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex col-span-2">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.wind_shiel"
                                                        value="G"
                                                        checked={values.part.wind_shiel === "G"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">G</span>
                                                </label>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.wind_shiel"
                                                        value="F"
                                                        checked={values.part.wind_shiel === "F"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">F</span>
                                                </label>
                                            </li>
                                            <li className="w-full">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.wind_shiel"
                                                        value="P"
                                                        checked={values.part.wind_shiel === "P"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">P</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-3/4">
                                    <textarea
                                        id="part.note_wind_shiel"
                                        name="part.note_wind_shiel"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                                border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your notes here..."
                                        value={values.part.note_wind_shiel}
                                        onChange={handleChange}
                                    ></textarea>
                                    
                                    <input
                                        type="file"
                                        id="part.image_wind_shiel"
                                        name="part.image_wind_shiel"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
                                        onChange={handleChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <div className="grid grid-cols-3 mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                            Windows
                                        </label>

                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex col-span-2">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.windows"
                                                        value="G"
                                                        checked={values.part.windows === "G"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">G</span>
                                                </label>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.windows"
                                                        value="F"
                                                        checked={values.part.windows === "F"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">F</span>
                                                </label>
                                            </li>
                                            <li className="w-full">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.windows"
                                                        value="P"
                                                        checked={values.part.windows === "P"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">P</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-3/4">
                                    <textarea
                                        id="part.note_windows"
                                        name="part.note_windows"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                                border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your notes here..."
                                        value={values.part.note_windows}
                                        onChange={handleChange}
                                    ></textarea>
                                    
                                    <input
                                        type="file"
                                        id="part.image_windows"
                                        name="part.image_windows"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
                                        onChange={handleChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <div className="grid grid-cols-3 mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                            Mirrors
                                        </label>

                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex col-span-2">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.mirrors"
                                                        value="G"
                                                        checked={values.part.mirrors === "G"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">G</span>
                                                </label>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.mirrors"
                                                        value="F"
                                                        checked={values.part.mirrors === "F"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">F</span>
                                                </label>
                                            </li>
                                            <li className="w-full">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.mirrors"
                                                        value="P"
                                                        checked={values.part.mirrors === "P"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">P</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-3/4">
                                    <textarea
                                        id="part.note_mirrors"
                                        name="part.note_mirrors"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                                border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your notes here..."
                                        value={values.part.note_mirrors}
                                        onChange={handleChange}
                                    ></textarea>
                                    
                                    <input
                                        type="file"
                                        id="part.image_mirrors"
                                        name="part.image_mirrors"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
                                        onChange={handleChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <div className="grid grid-cols-3 mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                            Rear Windows
                                        </label>

                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex col-span-2">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.rear_windows"
                                                        value="G"
                                                        checked={values.part.rear_windows === "G"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">G</span>
                                                </label>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.rear_windows"
                                                        value="F"
                                                        checked={values.part.rear_windows === "F"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">F</span>
                                                </label>
                                            </li>
                                            <li className="w-full">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.rear_windows"
                                                        value="P"
                                                        checked={values.part.rear_windows === "P"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">P</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-3/4">
                                    <textarea
                                        id="part.note_rear_windows"
                                        name="part.note_rear_windows"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                                border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your notes here..."
                                        value={values.part.note_rear_windows}
                                        onChange={handleChange}
                                    ></textarea>
                                    
                                    <input
                                        type="file"
                                        id="part.image_rear_windows"
                                        name="part.image_rear_windows"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
                                        onChange={handleChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG.</p>
                                </div>
                            </div>

                            {/* Tires & Wheels */}
                            <div className="text-center m-4 text-gray-700 text-lg font-semibold">Tires and Wheels</div>
                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <div className="grid grid-cols-3 mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                            Tires
                                        </label>

                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex col-span-2">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.tires"
                                                        value="G"
                                                        checked={values.part.tires === "G"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">G</span>
                                                </label>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.tires"
                                                        value="F"
                                                        checked={values.part.tires === "F"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">F</span>
                                                </label>
                                            </li>
                                            <li className="w-full">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.tires"
                                                        value="P"
                                                        checked={values.part.tires === "P"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">P</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-3/4">
                                    <textarea
                                        id="part.note_tires"
                                        name="part.note_tires"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                                border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your notes here..."
                                        value={values.part.note_tires}
                                        onChange={handleChange}
                                    ></textarea>
                                    
                                    <input
                                        type="file"
                                        id="part.image_tires"
                                        name="part.image_tires"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
                                        onChange={handleChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <div className="grid grid-cols-3 mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 mt-auto">
                                            Wheels
                                        </label>

                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex col-span-2">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.wheels"
                                                        value="G"
                                                        checked={values.part.wheels === "G"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">G</span>
                                                </label>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.wheels"
                                                        value="F"
                                                        checked={values.part.wheels === "F"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">F</span>
                                                </label>
                                            </li>
                                            <li className="w-full">
                                                <label className="flex items-center ps-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="part.wheels"
                                                        value="P"
                                                        checked={values.part.wheels === "P"}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="w-full py-3 ms-2">P</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-3/4">
                                    <textarea
                                        id="part.note_wheels"
                                        name="part.note_wheels"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                                border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your notes here..."
                                        value={values.part.note_wheels}
                                        onChange={handleChange}
                                    ></textarea>
                                    
                                    <input
                                        type="file"
                                        id="part.image_wheels"
                                        name="part.image_wheels"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
                                        onChange={handleChange}
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG.</p>
                                </div>
                            </div>
                        </>
                    )}

                    {page == 'page3' && (
                        <div className="grid w-full">
                            <div className="max-w-[80%] w-full mx-auto border border-gray-300 rounded-lg p-4 grid gap-2">
                                {/* Bagian 1 */}
                                <div className="flex flex-1 items-center justify-center">
                                    <div className="bg-gray-300 p-4 rounded">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="car.front_view" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 max-h-48">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {preview.front_view ? (
                                                        <img src={preview.front_view} className="w-24 h-24 object-cover rounded" />
                                                    ) : (
                                                        <img width="80" height="80" src="https://img.icons8.com/dotty/80/tesla-model-s.png" alt="default"/>
                                                    )}

                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG</p>
                                                </div>
                                                <input onChange={handleChange} id="car.front_view" name="car.front_view" type="file" className="hidden" />
                                            </label>
                                        </div> 
                                    </div>
                                </div>

                                {/* Bagian 2 */}
                                <div className="flex flex-1 justify-between items-center">
                                    <div className="bg-gray-300 p-4 rounded">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="car.left_view" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 max-h-48">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {preview.left_view ? (
                                                        <img src={preview.left_view} className="w-24 h-24 object-cover rounded" />
                                                    ) : (
                                                        <img width="80" height="80" src="https://img.icons8.com/dotty/80/london-cab.png" alt="london-cab" className="scale-x-[-1]" />
                                                    )}
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG</p>
                                                </div>
                                                
                                                <input onChange={handleChange} id="car.left_view" name="car.left_view" type="file" className="hidden" />
                                            </label>
                                        </div> 
                                    </div>
                                    <div className="bg-gray-300 p-4 rounded">
                                        <div className="flex items-center justify-center w-full">
                                            <img width="100" height="100" src="https://img.icons8.com/clouds/100/fiat-500.png" alt="fiat-500" />
                                        </div> 
                                    </div>
                                    <div className="bg-gray-300 p-4 rounded">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="car.right_view" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 max-h-48">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {preview.right_view ? (
                                                        <img src={preview.right_view} className="w-24 h-24 object-cover rounded" />
                                                    ) : (
                                                        <img width="80" height="80" src="https://img.icons8.com/dotty/80/london-cab.png" alt="london-cab"/>
                                                    )}
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG</p>
                                                </div>
                                                <input onChange={handleChange} id="car.right_view" name="car.right_view" type="file" className="hidden" />
                                            </label>
                                        </div> 
                                    </div>
                                </div>

                                {/* Bagian 3 */}
                                <div className="flex flex-1 items-center justify-center">
                                    <div className="bg-gray-300 p-4 rounded">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="car.back_view" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 max-h-48">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {preview.back_view ? (
                                                        <img src={preview.back_view} className="w-24 h-24 object-cover rounded" />
                                                    ) : (
                                                        <img width="80" height="80" src="https://img.icons8.com/dotty/80/traction-control.png" alt="traction-control"/>
                                                    )}
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG</p>
                                                </div>
                                                <input onChange={handleChange} id="car.back_view" name="car.back_view" type="file" className="hidden" />
                                            </label>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {page == 'page4' && (
                        <div className="grid w-full">
                            <div className="max-w-[80%] w-full mx-auto border border-gray-300 rounded-lg p-4 grid gap-2 text-gray-800">
                                <div className="underline text-lg font-bold">Syarat dan Ketentuan - Serah terima endaraan di Wrap Station</div>
                                <ol className="p-2 list-decimal pl-5">
                                    <li>Kondisi kendaraan dapat berubah setelah pembersihan. Tim akan menginformasikan jika ada perubahan.</li>
                                    <li>Status cat kendaraan (repeint/original) tidak dapat di pastikan, resiko ditanggung pemilik.</li>
                                    <li>Penambahan jarak tempuh (mileage) bisa terjadi, dan bukan tanggung jawab Wpar Station.</li>
                                    <li>Kerusakan/malfungsi mesin selama atau setelah pengerjaan bukan tanggung jawab kami.</li>
                                    <li>Kerusakan akibat pembongkaran aksesoris oleh pihak lain bukan tanggung jawab kami.</li>
                                    <li>Kehilangan barang pribadi bukan tanggung jawab Wrap Station. Harap kosongkan kendaraan.</li>
                                    <li>Wrap Station berhak melakukan tindakan teknis bila diperlukan dan di setujui sebelumnya.</li>
                                    <li>Kondisi/modifikasi khusus yang tidak diinformasikan menjadi tanggung jawab pemilik.</li>
                                    <li>Penurunan berat EV adalah kondisi alami, bukan tanggung jawab kami.</li>
                                    <li>Estimasi pengerjaan dapat berubah, keterlambatan akan diinformasikan ke pelanggan.</li>
                                </ol>
                            </div>
                            <div className="flex items-center m-4 max-w-[80%] w-full mx-auto">
                                <input
                                    id="confirm_terms"
                                    name="confirm_terms"
                                    type="checkbox"
                                    checked={values.confirm_terms}
                                    onChange={(e) => setValues(prev => ({
                                        ...prev,
                                        confirm_terms: e.target.checked
                                    }))}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                                />
                                <label htmlFor="confirm_terms" className="ms-2 text-sm font-medium text-gray-900">
                                    Saya telah membaca dan menyetujui Syarat dan Ketentuan di atas.
                                </label>
                            </div>

                            <div className="flex items-center m-4 max-w-[80%] w-full mx-auto">
                                <div className="flex max-w-[30%] w-full">
                                    <Button
                                        btnType="submit"
                                        type="warning"
                                        text="Submit"
                                        optionalClass="w-full"
                                        isLoading={loading}
                                        onClick={handleSubmit}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
Dashboard.layout = (page) => <Auth children={page} Title='Home' />

export default Dashboard;