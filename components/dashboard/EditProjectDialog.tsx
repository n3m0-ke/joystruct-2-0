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

interface Image {
    name: string;
    url: string;
}

interface EditProjectDialogProps {
    project: Project;
    open: boolean;
    handleClose: (updatedProject?: Project) => void;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({ project, open, handleClose }) => {
    const [projectName, setProjectName] = useState<string>(project.projectName);
    const [completionYear, setCompletionYear] = useState<string>(project.completionYear);
    const [description, setDescription] = useState<string>(project.description);
    const [videoUrl, setVideoUrl] = useState<string | undefined>(project.videoUrl);
    const [images, setImages] = useState<FileList | null>(null);
    const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const videoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (project.imageUrls) {
            const initialImages = project.imageUrls.map((url) => ({
                name: url.substring(url.lastIndexOf('/') + 1),
                url,
            }));
            setUploadedImages(initialImages);
        }
    }, [project.imageUrls]);

    const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    };

    const handleCompletionYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompletionYear(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(e.target.value);
    };

    const handleVideoUploadClick = () => {
        if (videoRef.current) {
            videoRef.current.click();
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(e.target.files);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const projectDocRef = doc(db, 'projects', project.id);

            const imageUrls = [...uploadedImages.map(image => image.url)];
            if (images && images.length > 0) {
                const imageUploadPromises = Array.from(images).map(async (image) => {
                    const imageRef = ref(storage, `projectImages/${project.id}/${image.name}`);
                    await uploadBytes(imageRef, image);
                    const imageUrl = await getDownloadURL(imageRef);
                    imageUrls.push(imageUrl);
                });

                await Promise.all(imageUploadPromises);
            }

            const updatedProject = {
                projectName: projectName || project.projectName, // Ensure project name is not undefined
                completionYear: completionYear || project.completionYear, // Ensure completion year is not undefined
                description: description || project.description, // Ensure description is not undefined
                videoUrl: videoUrl || project.videoUrl, // Ensure video URL is not undefined
                imageUrls: imageUrls.length > 0 ? imageUrls : project.imageUrls, // Ensure image URLs are not undefined
            };

            await updateDoc(projectDocRef, updatedProject);

            // Communicate the updated project back to the parent component
            handleClose({
                ...project,
                ...updatedProject,
            });
        } catch (error) {
            console.error("Error updating project: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        handleClose(); // Close dialog without updating
    };

    return (
        <Dialog open={open} handler={handleCloseDialog} 
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Edit Project</DialogHeader>
            <DialogBody divider placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                            Project Name
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={handleProjectNameChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="completionYear" className="block text-sm font-medium text-gray-700">
                            Completion Year
                        </label>
                        <input
                            type="text"
                            id="completionYear"
                            value={completionYear}
                            onChange={handleCompletionYearChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                            Video URL
                        </label>
                        <input
                            type="url"
                            id="videoUrl"
                            value={videoUrl}
                            onChange={handleVideoUrlChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                            type="file"
                            accept="video/*"
                            ref={videoRef}
                            onChange={handleVideoUrlChange}
                            className="hidden"
                        />
                        <Button
                            color="light-blue"
                            size="sm"
                            onClick={handleVideoUploadClick}
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            Upload Video
                        </Button>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                            Project Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            multiple
                            onChange={handleImagesChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <div className="mt-4">
                            {uploadedImages.map((image) => (
                                <div key={image.url} className="inline-block mr-4 mb-4">
                                    <Image
                                        src={image.url}
                                        alt={image.name}
                                        width={100}
                                        height={100}
                                        className="object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        color="blue"
                        size="lg"
                        type="submit"
                        disabled={loading}
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        {loading ? <Image src={LoadingGiff} alt="loading" /> : 'Save'}
                    </Button>
                </form>
            </DialogBody>
            <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Button
                    color="red"
                    variant="text"
                    onClick={handleCloseDialog}
                    className="mr-1"
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default EditProjectDialog;
