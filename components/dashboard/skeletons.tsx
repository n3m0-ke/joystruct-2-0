'use client'

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfigFile';

export function CardsSkeleton() {
    const [bookings, setBookings] = useState(0);
    const [contacts, setContacts] = useState(0);
    const [projects, setProjects] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch demoBookings count
                const bookingsSnapshot = await getDocs(collection(db, 'demoBookings'));
                setBookings(bookingsSnapshot.size);

                // Fetch contactUsRecords count
                const contactsSnapshot = await getDocs(collection(db, 'contactUsRecords'));
                setContacts(contactsSnapshot.size);

                // Fetch projects count
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
        return <p>Loading...</p>; // Add your custom loading skeleton here if necessary
    }

    return (
        <>
            <div
                className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
            >
                <div className="flex p-4">
                    <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                    <p>Demo Bookings</p>
                    <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
                </div>
                <div className="flex flex-col justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                    <p>Number of Bookings so far</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-yellow-400 font-light ">{bookings}</span>
                        <a href="/admin/customers" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-white bg-zinc-700 hover:bg-zinc-800 hover:outline-goldenrod focus:ring-4 focus:outline-none focus:ring-goldenrod font-medium rounded-lg text-sm px-5 py-2.5 text-center ">go to Clients -&gt;</a>
                    </div>
                </div>
            </div>
            {/* Repeat for contacts and projects */}
            <div
                className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
            >
                <div className="flex p-4">
                    <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                    <p>Contact Us</p>
                    <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
                </div>
                <div className="flex flex-col justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                    <p>Number of Contact Messages</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-yellow-400 font-light ">{contacts}</span>
                        <a href="/admin/customers" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-white bg-zinc-700 hover:bg-zinc-800 hover:outline-goldenrod focus:ring-4 focus:outline-none focus:ring-goldenrod font-medium rounded-lg text-sm px-5 py-2.5 text-center ">go to Clients -&gt;</a>
                    </div>
                </div>
            </div>
            <div
                className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
            >
                <div className="flex p-4">
                    <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                    <p>Projects</p>
                    <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
                </div>
                <div className="flex flex-col justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                    <p>Number of Projects shown</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-yellow-400 font-light ">{projects}</span>
                        <a href="/admin/projects" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-white bg-zinc-700 hover:bg-zinc-800 hover:outline-goldenrod focus:ring-4 focus:outline-none focus:ring-goldenrod font-medium rounded-lg text-sm px-5 py-2.5 text-center ">go to Projects -&gt;</a>
                    </div>
                </div>
            </div>
            {/* Add other metrics here as needed */}
        </>
    );
}
