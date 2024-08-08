'use client'

import { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { CardsSkeleton } from './skeletons';

export default function DashOverviewBody() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();

        console.log("Within the function")

        try {

            console.log("Already trying");
            if (auth.currentUser) {
                console.log("whatever auth.currentUser returns");
                await updatePassword(auth.currentUser, newPassword);
                setMessage('Password updated successfully.');
            }else{
                console.log("auth.currentUser is a no no. auth: ", auth);
            }
        } catch (error) {
            console.error('Password update error:', error);
            setMessage('Failed to update password.');
        }
    };

    return (
        <main>
            <h1 className={`mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 min-h-48">
                <CardsSkeleton />
            </div>

            <div className="mt-6 w-full h-auto bg-black bg-opacity-15">
                <form onSubmit={handlePasswordChange} className="col-span-4 bg-transparent p-6 rounded shadow-md">
                    <h2 className="mb-4 text-lg font-semibold">Change Password</h2>

                    <input
                        type="password"
                        id='currentPass'
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"
                    />
                    <input
                        type="password"
                        id='newPass'
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"
                    />

                    <button type="submit" className="w-full mt-6 py-2 bg-green-600 text-white rounded">
                        Change Password
                    </button>
                    {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
                </form>
            </div>
        </main>
    );
}
