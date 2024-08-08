'use client'

import { SetStateAction, useEffect, useState } from 'react';
import { db } from '../../../firebaseConfigFile';
import { collection, getDocs } from 'firebase/firestore';
import { Card, Button } from '@material-tailwind/react';

interface DemoBooking {
    type: string;
    clientName: string;
    email: string;
    timestamp: string;
    // Add other properties as needed
}

interface ContactUsRecord {
    type: string;
    clientName: string;
    email: string;
    message: string;
    timestamp: string;
    // Add other properties as needed
}

const CustomersPage = () => {
    const [demoBookings, setDemoBookings] = useState<DemoBooking[]>([]);
    const [contactUsRecords, setContactUsRecords] = useState<ContactUsRecord[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<DemoBooking | ContactUsRecord | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDemoBookings = async () => {
            const querySnapshot = await getDocs(collection(db, "demoBookings"));
            setDemoBookings(querySnapshot.docs.map(doc => doc.data() as DemoBooking));
        };

        const fetchContactUsRecords = async () => {
            const querySnapshot = await getDocs(collection(db, "contactUsRecords"));
            setContactUsRecords(querySnapshot.docs.map(doc => doc.data() as ContactUsRecord));
        };

        fetchDemoBookings();
        fetchContactUsRecords();
    }, []);

    const openModal = (record: SetStateAction<DemoBooking | ContactUsRecord | null>) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRecord(null);
        setIsModalOpen(false);
    };

    // Type guard function
    const isContactUsRecord = (record: DemoBooking | ContactUsRecord): record is ContactUsRecord => {
        return (record as ContactUsRecord).message !== undefined;
    };

    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Customer Feedback & Demo Bookings</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    className='bg-black bg-opacity-60 p-4 border-goldenrod'
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

                    <h2 className="text-lg font-medium text-white">Demo Bookings</h2>
                    <p className='text-white'>{demoBookings.length} Total Bookings</p>
                </Card>
                <Card 
                    className='bg-black bg-opacity-60 p-4 border-goldenrod'                
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <h2 className="text-lg font-medium text-white">Contact Us Feedback</h2>
                    <p className='text-white'>{contactUsRecords.length} Total Feedback</p>
                </Card>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-black bg-opacity-70">
                    <thead className="bg-purple-700 text-white">
                        <tr>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Client Name</th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...demoBookings, ...contactUsRecords].map((record, index) => (
                            <tr key={index} className="hover:bg-gray-900 bg-opacity-50">
                                <td className="w-1/3 text-left py-3 px-4">{record.type || "Demo Booking"}</td>
                                <td className="w-1/3 text-left py-3 px-4">{record.clientName}</td>
                                <td className="w-1/3 text-left py-3 px-4">{record.email}</td>
                                <td className="text-left py-3 px-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => openModal(record)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {selectedRecord?.clientName}
                                        </h3>
                                        <div className="mt-2">
                                            <p><strong>Email:</strong> {selectedRecord?.email}</p>
                                            {/* <p><strong>Message:</strong> {isContactUsRecord(selectedRecord) ? selectedRecord.message : "N/A"}</p>
                                            <p><strong>Details:</strong> {!isContactUsRecord(selectedRecord) ? "N/A" : selectedRecord.message || selectedRecord.details}</p> */}
                                            <p><strong>Timestamp:</strong> {selectedRecord?.timestamp}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={closeModal}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CustomersPage;
