'use client'

import { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { CardsSkeleton } from './skeletons';

export default function DashOverviewBody() {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setError('User not authenticated. Please log in again.');
            return;
        }

        try {
            await updatePassword(user, newPassword);
            setMessage('Password updated successfully.');
            setError('');
        } catch (error: any) {
            console.error('Password update error:', error);
            if (error.code === 'auth/requires-recent-login') {
                setError('You need to log in again to change your password.');
            } else {
                setError('Failed to update password.');
            }
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
                        id='newPass'
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"
                    />

                    <button type="submit" className="w-full mt-6 py-2 bg-green-600 text-white rounded">
                        Change Password
                    </button>

                    {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
                    {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                </form>
            </div>
        </main>
    );
}
