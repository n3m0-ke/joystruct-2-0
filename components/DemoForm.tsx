import React, { useState } from "react";
import { db } from "@/firebaseConfigFile";
import { collection, addDoc } from "firebase/firestore";
import Image from "next/image";

interface DemoFormProps {
  onSuccess?: () => void;
}

export function DemoForm({ onSuccess }: DemoFormProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    position: "",
    email: "",
    phone: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const docRef = await addDoc(collection(db, "demoBookings"), {
        ...formData,
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);

      setSuccessMsg("✅ Your demo request has been submitted!");
      setFormData({
        clientName: "",
        companyName: "",
        position: "",
        email: "",
        phone: "",
        details: "",
      });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500); // close modal after a short delay
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setSuccessMsg("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-4 min-w-max mx-auto">
      <form
        className="mt-4 mx-auto content-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          {/* Inputs */}
          {[
            { id: "clientName", label: "Name" },
            { id: "companyName", label: "Company Name" },
            { id: "position", label: "Position" },
            { id: "email", label: "Email" },
            { id: "phone", label: "Phone" },
          ].map((field) => (
            <div key={field.id} className="relative w-96">
              <input
                type="text"
                id={field.id}
                value={(formData as any)[field.id]}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-4 w-full text-md bg-transparent border-0 border-b-2 border-teal-500 text-white focus:outline-none focus:ring-0 focus:border-teal-400 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={field.id}
                className="absolute text-sm text-teal-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-teal-300"
              >
                {field.label}
              </label>
            </div>
          ))}

          {/* Details */}
          <div className="relative w-96">
            <textarea
              id="details"
              rows={4}
              value={formData.details}
              onChange={handleChange}
              className="block rounded-t-lg px-2.5 pb-2.5 pt-4 w-full text-md bg-transparent border-0 border-b-2 border-teal-500 text-white focus:outline-none focus:ring-0 focus:border-teal-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="details"
              className="absolute text-sm text-teal-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-teal-300"
            >
              Any Details/Interests
            </label>
          </div>
        </div>

        {/* Submit button with loader */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-md flex justify-center items-center transition"
        >
          {loading && (
            <Image
              src="/loding.gif"
              alt="loading..."
              width={24}
              height={24}
              className="mr-2"
            />
          )}
          {loading ? "Submitting..." : "Submit Details"}
        </button>

        {/* Success/Failure message */}
        {successMsg && (
          <p className="mt-4 text-center text-sm text-teal-400">
            {successMsg}
          </p>
        )}
      </form>
    </div>
  );
}
