'use client';

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for routing in Next.js 14
import { app } from '@/firebaseConfigFile';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      document.cookie = `authToken=${token}; path=/;`; // Set token in a cookie

      router.push('/admin'); // Redirect to the admin dashboard
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen backgroundPattern">
      <form onSubmit={handleLogin} className="bg-black bg-opacity-50 rounded-lg  p-6 border border-goldenrod shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Admin Login</h2>

        {/* Admin Email */}
        <div className="flex flex-col mb-4 w-96">
          <div className="relative">
            <input 
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-lg bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"/>
            <label htmlFor="email" className="absolute text-lg text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
          </div>
        </div>

        {/* Admin Password */}
        <div className="flex flex-col mb-4 w-96">
          <div className="relative">
            <input 
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-lg bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"/>
            <label htmlFor="email" className="absolute text-lg text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
          </div>
        </div>


        {/* <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        /> */}
        <button type="submit" className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}
