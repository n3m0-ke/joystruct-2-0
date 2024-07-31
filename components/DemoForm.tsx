import React, { useState } from 'react';
import {db} from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";

export function DemoForm() {
    const [formData, setFormData] = useState({
        clientName: '',
        companyName: '',
        position: '',
        email: '',
        phone: '',
        details: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const docRef = await addDoc(collection(db, 'demoBookings'), {
            clientName: formData.clientName,
            companyName: formData.companyName,
            position: formData.position,
            email: formData.email,
            phone: formData.phone,
            details: formData.details,
            timestamp: new Date()
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
    };

    return (
        <div className="flex flex-col items-end gap-6 min-w-max mx-auto">
            <form className="mt-8 mx-auto content-center" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    {/* Customer Name */}
                    <div className="flex w-96 flex-col gap-6">
                        <div className="relative">
                            <input 
                                type="text" 
                                id="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                            <label htmlFor="clientName" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
                        </div>
                    </div>

                    {/* Company Name and Position */}

                    <div className="flex flex-row w-96 ">
                        <div className="flex w-48 flex-col gap-6">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange} 
                                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                <label htmlFor="companyName" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Company Name</label>
                            </div>
                        </div>
                        <div className="flex w-48 flex-col gap-6">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                <label htmlFor="position" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Position</label>
                            </div>
                        </div>
                    </div>

                    {/* Email + phone number */}
                    <div className="flex flex-row w-96 ">
                        <div className="flex w-48 flex-col gap-6">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="email" 
                                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                <label htmlFor="email" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                            </div>
                        </div>
                        <div className="flex w-48 flex-col gap-6">
                            <div className="relative">
                                <input type="text" id="phone" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                <label htmlFor="phone" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-96">
                        <div className="flex w-96 flex-col gap-6">
                            <div className="relative">
                                <textarea id="details" rows={4} className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                <label htmlFor="details" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Any Details/Interests</label>
                            </div>
                        </div>
                    </div>                                       
                </div>

                <button type="submit"
                    className="mt-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                    Submit Details
                </button>                
            </form>            
        </div>
    );
}