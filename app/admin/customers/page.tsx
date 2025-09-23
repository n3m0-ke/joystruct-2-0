'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { db } from '../../../firebaseConfigFile';
import { collection, getDocs } from 'firebase/firestore';
import { Card } from '@material-tailwind/react';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/16/solid';
import { UserGroupIcon } from '@heroicons/react/16/solid';

interface DemoBooking {
  type: string;
  clientName: string;
  email: string;
  timestamp: string;
}

interface ContactUsRecord {
  type: string;
  clientName: string;
  email: string;
  message: string;
  timestamp: string;
}

const CustomersPage = () => {
  const [demoBookings, setDemoBookings] = useState<DemoBooking[]>([]);
  const [contactUsRecords, setContactUsRecords] = useState<ContactUsRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<DemoBooking | ContactUsRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demoSnapshot = await getDocs(collection(db, 'demoBookings'));
        setDemoBookings(demoSnapshot.docs.map(doc => doc.data() as DemoBooking));

        const contacSnapshot = await getDocs(collection(db, 'contactUsRecords'));
        setContactUsRecords(contacSnapshot.docs.map(doc => doc.data() as ContactUsRecord));

      } catch (error) {
        console.error("Error fetching customers: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openModal = (record: SetStateAction<DemoBooking | ContactUsRecord | null>) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <main className="p-6 space-y-8">
        <h1 className="text-2xl font-bold text-teal-400">Customer Feedback & Demo Bookings</h1>

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

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-8 rounded-lg shadow-md bg-neutral-900 border border-neutral-800 animate-pulse"
            >
              <div className="w-16 h-16 bg-neutral-700 rounded-full mb-6"></div>
              <div className="h-6 bg-neutral-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
            </div>
          ))}
        </div>


        {/* Records table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <thead className="bg-neutral-800 text-teal-400">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Client Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-3 px-4">
                    <div className="h-4 w-24 bg-neutral-700 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-32 bg-neutral-700 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-40 bg-neutral-700 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-8 w-20 bg-neutral-700 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  } else {
    return (
      <main className="p-6 space-y-8">
        <h1 className="text-2xl font-bold text-teal-400">Customer Feedback & Demo Bookings</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demo Bookings */}
          <div className="service-card p-8 rounded-lg shadow-md bg-neutral-900 border border-neutral-800 transition duration-500">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <UserGroupIcon className="text-teal-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">Demo Bookings</h3>
            <p className="text-gray-400 mb-4">Number of demo bookings so far</p>
            <span className="text-2xl font-bold text-teal-400">{demoBookings.length}</span>
          </div>

          {/* Contact Messages */}
          <div className="service-card p-8 rounded-lg shadow-md bg-neutral-900 border border-neutral-800 transition duration-500">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <ChatBubbleOvalLeftIcon className="text-teal-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3 text-white">Contact Messages</h3>
            <p className="text-gray-400 mb-4">Total inquiries received</p>
            <span className="text-2xl font-bold text-teal-400">{contactUsRecords.length}</span>
          </div>
        </div>


        {/* Records table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <thead className="bg-neutral-800 text-teal-400">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Client Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...demoBookings, ...contactUsRecords].map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-neutral-800 transition-colors text-gray-300"
                >
                  <td className="py-3 px-4">{record.type || 'Demo Booking'}</td>
                  <td className="py-3 px-4">{record.clientName}</td>
                  <td className="py-3 px-4">{record.email}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-1 px-3 rounded transition"
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
              <h3 className="text-xl font-semibold text-teal-400 mb-4">
                {selectedRecord?.clientName}
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong className="text-white">Email:</strong> {selectedRecord?.email}
                </p>
                {'message' in (selectedRecord || {}) && (
                  <p>
                    <strong className="text-white">Message:</strong>{' '}
                    {(selectedRecord as ContactUsRecord).message}
                  </p>
                )}
                <p>
                  <strong className="text-white">Timestamp:</strong>{" "}
                  {selectedRecord?.timestamp
                    ? typeof selectedRecord.timestamp === "object" &&
                      selectedRecord.timestamp !== null &&
                      "seconds" in selectedRecord.timestamp
                      ? new Date(
                        (selectedRecord.timestamp as { seconds: number; nanoseconds: number })
                          .seconds * 1000
                      ).toLocaleString()
                      : String(selectedRecord.timestamp)
                    : "N/A"}
                </p>


              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }


};

export default CustomersPage;