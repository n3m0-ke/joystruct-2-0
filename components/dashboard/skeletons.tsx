'use client'

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfigFile';
import { UserGroupIcon, ChatBubbleOvalLeftIcon, FolderIcon } from '@heroicons/react/24/outline';
import Image from "next/image";

export function CardsSkeleton() {
    const [bookings, setBookings] = useState(0);
    const [contacts, setContacts] = useState(0);
    const [projects, setProjects] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsSnapshot = await getDocs(collection(db, 'demoBookings'));
                setBookings(bookingsSnapshot.size);

                const contactsSnapshot = await getDocs(collection(db, 'contactUsRecords'));
                setContacts(contactsSnapshot.size);

                const projectsSnapshot = await getDocs(collection(db, 'projects'));
                setProjects(projectsSnapshot.size);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        // 🔄 Shimmer state
        return (
            <>
                <div className="flex items-center space-x-3 text-teal-400">
                    <svg
                        className="animate-spin h-6 w-6 text-teal-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <span className="text-lg">Fetching data...</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-8 rounded-lg shadow-md bg-neutral-900 border border-neutral-800 animate-pulse">
                            <div className="w-16 h-16 bg-neutral-700 rounded-full mb-6"></div>
                            <div className="h-6 bg-neutral-700 rounded w-1/2 mb-4"></div>
                            <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full">
            {/* Demo Bookings */}
            <div className="service-card p-8 rounded-lg shadow-md bg-neutral-900 border border-neutral-800 transition duration-500">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <UserGroupIcon className="text-teal-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-white">Demo Bookings</h3>
                <p className="text-gray-400 mb-4">Number of bookings so far</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-400">{bookings}</span>
                    <a
                        href="/admin/customers"
                        className="text-sm px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition"
                    >
                        View →
                    </a>
                </div>
            </div>

            {/* Contact Us */}
            <div className="service-card p-8 rounded-lg shadow-md bg-neutral-900 border border-neutral-800 transition duration-500">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <ChatBubbleOvalLeftIcon className="text-teal-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-white">Contact Messages</h3>
                <p className="text-gray-400 mb-4">Total inquiries received</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-400">{contacts}</span>
                    <a
                        href="/admin/customers"
                        className="text-sm px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition"
                    >
                        View →
                    </a>
                </div>
            </div>

            {/* Projects */}
            <div className="service-card p-8 rounded-lg shadow-md bg-neutral-900 border border-neutral-800 transition duration-500">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <FolderIcon className="text-teal-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-white">Projects</h3>
                <p className="text-gray-400 mb-4">Number of projects displayed</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-400">{projects}</span>
                    <a
                        href="/admin/projects"
                        className="text-sm px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition"
                    >
                        View →
                    </a>
                </div>
            </div>
        </div>
    );
}
