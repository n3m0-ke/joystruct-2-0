'use client';

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfigFile";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

interface Employee {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export default function EmployeesBody() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Modal state
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Fetch employees
  const fetchEmployees = async () => {
    const snapshot = await getDocs(collection(db, "employees"));
    const list = snapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Employee)
    );
    setEmployees(list);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add employee
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const storage = getStorage();
        const imageRef = ref(storage, `images/employees/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "employees"), {
        name,
        role,
        bio,
        imageUrl,
      });

      setName("");
      setRole("");
      setBio("");
      setImageFile(null);

      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete employee
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "employees", id));
    setSelectedEmployee(null);
    fetchEmployees();
  };

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-teal-400">Employees</h1>

      {/* Add Employee Form */}
      <form
        onSubmit={handleAddEmployee}
        className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg space-y-4"
      >
        <h2 className="text-lg font-semibold text-white">Add New Employee</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-neutral-800 text-white rounded"
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 bg-neutral-800 text-white rounded"
          required
        />
        <textarea
          placeholder="Short Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 bg-neutral-800 text-white rounded"
          rows={3}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="text-gray-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>

      {/* Employee List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-center"
          >
            <img
              src={emp.imageUrl}
              alt={emp.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{emp.name}</h3>
            <p className="text-teal-400">{emp.role}</p>
            <button
              className="mt-3 px-4 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded"
              onClick={() => setSelectedEmployee(emp)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-teal-400 mb-2">
              {selectedEmployee.name}
            </h2>
            <p className="text-gray-300 mb-1">
              <strong className="text-white">Role:</strong>{" "}
              {selectedEmployee.role}
            </p>
            <p className="text-gray-300 mb-1">
              <strong className="text-white">Bio:</strong>{" "}
              {selectedEmployee.bio}
            </p>
            <img
              src={selectedEmployee.imageUrl}
              alt={selectedEmployee.name}
              className="w-32 h-32 mx-auto rounded-full object-cover my-4"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(selectedEmployee.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
