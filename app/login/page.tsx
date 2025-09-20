"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/firebaseConfigFile";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();
      document.cookie = `authToken=${token}; path=/;`;

      router.push("/admin");
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMsg(error.message || "Failed to login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen backgroundPattern">
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-black bg-opacity-60 rounded-lg p-8 border border-teal-500 shadow-lg w-full max-w-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Admin Sign In
        </h2>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 p-2 rounded">
            {errorMsg}
          </div>
        )}

        {/* Email */}
        <div className="relative mb-6">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            autoComplete="off"
            required
            className="peer block w-full rounded-t-lg px-2.5 pb-2.5 pt-5 text-lg bg-transparent border-0 border-b-2 border-teal-400 text-white focus:outline-none focus:ring-0 focus:border-teal-500"
          />
          <label
            htmlFor="email"
            className="absolute text-lg text-teal-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-teal-500"
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-8">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            autoComplete="new-password"
            required
            className="peer block w-full rounded-t-lg px-2.5 pb-2.5 pt-5 text-lg bg-transparent border-0 border-b-2 border-teal-400 text-white focus:outline-none focus:ring-0 focus:border-teal-500"
          />
          <label
            htmlFor="password"
            className="absolute text-lg text-teal-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-teal-500"
          >
            Password
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full focus:outline-none text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-500 font-medium rounded-lg text-lg px-5 py-3 transition"
        >
          {loading ? (
            <>
              <Image
                src="/loding.gif"
                alt="loading..."
                width={24}
                height={24}
                className="mr-2"
              />
              Signing you in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
