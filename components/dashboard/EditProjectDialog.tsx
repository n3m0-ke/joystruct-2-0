import React, { useRef, useState, useEffect } from 'react';
import { db, storage } from '@/firebaseConfigFile';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import LoadingGiff from "@/public/loding.gif";
import '@/app/projectInput.css';
import Image from "next/image";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
} from "@material-tailwind/react";

import type { Project } from './projectsBody';

import ProjectsBody from './projectsBody';

interface Image {
    name: string;
    url: string;
}

interface EditProjectDialogProps {
    project: Project;
    open: boolean;
    handleClose: () => void;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({ project, open, handleClose }) => {
    const [projectName, setProjectName] = useState(project.name);
    const [completionYear, setCompletionYear] = useState(project.completionYear);
    const [description, setDescription] = useState(project.description);
    const [images, setImages] = useState<Image[]>(project.imageUrls.map((url: string) => ({ name: '', url })));
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
                    if (image.url.startsWith('blob:')) {
                        const imageRef = ref(storage, `images/${image.name}`);
                        const response = await fetch(image.url);
                        const blob = await response.blob();
                        await uploadBytes(imageRef, blob);
                        const url = await getDownloadURL(imageRef);
                        return url;
                    } else {
                        return image.url; // already uploaded image
                    }
                })
            );

            const docRef = doc(db, 'projects', project.id);
            await updateDoc(docRef, {
                projectName,
                completionYear,
                description,
                imageUrls,
            });

            setSuccess(true);
            handleClose();
        } catch (error) {
            console.error('Error updating document: ', error);
        }

        setLoading(false);
    };

    return (
        <Dialog open={open} size="xxl" handler={handleClose} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <form onSubmit={handleSubmit}>
                <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Edit Project</DialogHeader>
                <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {success && (
                        <div className="mb-4 text-green-500">
                            Project details updated successfully!
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                    required
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
                                    required
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
                                        required
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

                    <div className="flex flex-wrap gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img src={image.url} alt={image.name} className="object-cover w-full h-full rounded-md" />
                                <button
                                    type="button"
                                    onClick={() => deleteImage(index)}
                                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <button type="button" onClick={selectFiles} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Add Images
                        </button>
                        <input
                            type="file"
                            name="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={onFileSelect}
                        />
                    </div>
                </DialogBody>
                <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleClose}
                        className="mr-2"
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        type="submit"
                        color="green"
                        className="ml-2"
                        disabled={loading}
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        <span>{loading ? 'Updating...' : 'Update'}</span>
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default EditProjectDialog;
