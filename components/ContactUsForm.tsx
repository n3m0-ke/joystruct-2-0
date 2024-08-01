'use client'

import React, { useState } from 'react';
import {db} from '@/firebaseConfigFile';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactUsForm(){
    const [formData, setFormData] = useState({
        clientName: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        });
        console.log(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const docRef = await addDoc(collection(db, 'contactUsRecords'), {
            clientName: formData.clientName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            timestamp: new Date()
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
    };

    return(
        <form onSubmit={handleSubmit} autoComplete='off'>
              {/* Customer Name */}
              <div className="flex w-full flex-col gap-6 mb-4">
                <div className="relative">
                  <input 
                    type="text" 
                    id="clientName" 
                    onChange={handleChange}
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                  <label htmlFor="clientName" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
                </div>
              </div>

              {/* Customer Email */}
              <div className="flex w-full flex-col gap-6 mb-4">
                <div className="relative">
                  <input 
                    type="text" 
                    id="email" 
                    onChange={handleChange}
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                  <label htmlFor="email" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                </div>
              </div>

              {/* subject */}
              <select 
                id="subject"
                onChange={handleChange}
                className="bg-transparent cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4">
                <option defaultValue="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
              </select>

              {/* description */}
              <div className="flex flex-row w-full mb-4">
                <div className="flex w-full flex-col gap-6">
                  <div className="relative">
                    <textarea 
                        id="message" 
                        rows={4}
                        onChange={handleChange}
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                    <label htmlFor="message" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Message</label>
                  </div>
                </div>
              </div>


              
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
    )
}