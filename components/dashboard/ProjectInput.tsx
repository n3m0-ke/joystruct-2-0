'use client';

import React, { useRef, useState } from 'react';
import { db, storage } from '@/firebaseConfigFile';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import LoadingGiff from "@/public/loding.gif";
import '@/app/projectInput.css';
import Image from "next/image";

interface Image {
    name: string;
    url: string;
}

const ProjectsInputForm: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [completionYear, setCompletionYear] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [success, setSuccess] = useState(false);



    const selectFiles = () => {
        fileInputRef.current?.click();
    };

    const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const newImages: Image[] = Array.from(files).map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const deleteImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const imageRef = ref(storage, `images/${image.name}`);
                    const response = await fetch(image.url);
                    const blob = await response.blob();
                    await uploadBytes(imageRef, blob);
                    const url = await getDownloadURL(imageRef);
                    return url;
                })
            );

            const docRef = await addDoc(collection(db, 'projects'), {
                projectName,
                completionYear,
                description,
                imageUrls,
            });

            setSuccess(true);

            console.log('Document written with ID: ', docRef.id);
            setProjectName('');
            setCompletionYear('');
            setDescription('');
            setImages([]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }

        setLoading(false);
    };

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4" onSubmit={handleSubmit}>
            <div className="bg-transparent p-6 rounded-lg shadow-lg">
                {success && (
                        <div className="mb-4 text-green-500">
                            Project details submitted successfully!
                        </div>
                    )}

                {/* Project Name */}
                <div className="flex w-full flex-col gap-6 mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="projectName"
                            className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Project Name/Reference
                        </label>
                    </div>
                </div>
                {/* Project Completion */}
                <div className="flex w-full flex-col gap-6 mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            id="completionYear"
                            value={completionYear}
                            onChange={(e) => setCompletionYear(e.target.value)}
                            pattern="\d{4}"
                            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="completionYear"
                            className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Year of Completion
                        </label>
                    </div>
                </div>
                {/* Description */}
                <div className="flex flex-row w-full mb-8">
                    <div className="flex w-full flex-col gap-6">
                        <div className="relative">
                            <textarea
                                id="description"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="description"
                                className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                            >
                                Description
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-transparent p-6 rounded-lg shadow-lg">
                <div className="card">
                    <div className="drag-area">
                        <span className="select" role="button" onClick={selectFiles}>
                            Browse
                        </span>
                        <input
                            type="file"
                            name="file"
                            multiple
                            className="file"
                            ref={fileInputRef}
                            onChange={onFileSelect}
                        />
                    </div>
                    <div className="container">
                        {images.map((image, index) => (
                            <div className="image" key={index}>
                                <span className="delete" onClick={() => deleteImage(index)}>
                                    &times;
                                </span>
                                <img src={image.url} alt={image.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                disabled={loading}
            >
                <span className="flex items-center">
                    {loading ? (
                        <Image
                            src={LoadingGiff}
                            alt="loading..."
                            width={32}
                            height={32}
                            className="mr-2"
                        />
                    ) : null}
                    {loading ? 'Submitting...' : 'Submit Details'}
                </span>
            </button>

        </form>
    );
};

export default ProjectsInputForm;
