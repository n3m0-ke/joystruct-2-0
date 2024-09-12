'use client';

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for routing in Next.js 14
import { app } from '@/firebaseConfigFile';
import LoadingGiff from "@/public/loding.gif";
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      document.cookie = `authToken=${token}; path=/;`; // Set token in a cookie
      
      router.push('/admin'); // Redirect to the admin dashboard
      setLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      alert('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen backgroundPattern">
      <form onSubmit={handleLogin} className="bg-black bg-opacity-50 rounded-lg  p-6 border border-goldenrod shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Admin Sign In</h2>

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
        <button 
          type="submit" 
          className="flex items-center justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 min-w-full"
          disabled={loading}>
            
            <span className="flex items-center">
              {loading ? (
                <Image
                  src={LoadingGiff}
                  alt="loading..."
                  width={32}
                  height={32}
                  className="mr-2"
                />
              ) : null }
              {loading ? "Signing you in ..." : "Sign In"}
            </span>
        </button>
      </form>
    </div>
  );
}
