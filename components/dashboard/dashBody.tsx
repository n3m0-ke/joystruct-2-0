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
    <main className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-400">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Cards section (stats) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardsSkeleton />
      </div>

      {/* Change Password */}
      <div className="w-full rounded-lg bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="mb-4 text-lg font-semibold text-teal-400">
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            id="newPass"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full rounded-md bg-black bg-opacity-40 px-3 py-2 text-sm text-white border border-neutral-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-md transition"
          >
            Change Password
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </div>
    </main>
  );
}
