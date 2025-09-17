'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { db } from '../../../firebaseConfigFile';
import { collection, getDocs } from 'firebase/firestore';
import { Card } from '@material-tailwind/react';

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

  useEffect(() => {
    const fetchDemoBookings = async () => {
      const querySnapshot = await getDocs(collection(db, 'demoBookings'));
      setDemoBookings(querySnapshot.docs.map(doc => doc.data() as DemoBooking));
    };

    const fetchContactUsRecords = async () => {
      const querySnapshot = await getDocs(collection(db, 'contactUsRecords'));
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

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-teal-400">Customer Feedback & Demo Bookings</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg" placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
          <h2 className="text-lg font-semibold text-white">Demo Bookings</h2>
          <p className="text-teal-400 text-xl">{demoBookings.length}</p>
        </Card>
        <Card className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg" placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null} >
          <h2 className="text-lg font-semibold text-white">Contact Us Feedback</h2>
          <p className="text-teal-400 text-xl">{contactUsRecords.length}</p>
        </Card>
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
                <strong className="text-white">Timestamp:</strong>{' '}
                {selectedRecord?.timestamp}
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
};

export default CustomersPage;
