'use client'
import React, { useState } from 'react';


interface Image {
    src: string;
    alt: string;
}

interface MasonryGridProps {
    images: Image[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images }) => {
    const columns = 4; // Define the number of columns you want

    const getColumns = (images: Image[], columns: number) => {
        const cols: Image[][] = Array.from({ length: columns }, () => []);
        images.forEach((image, index) => {
            cols[index % columns].push(image);
        });
        return cols;
    };

    const columnImages = getColumns(images, columns);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {columnImages.map((col, colIndex) => (
                <div className="grid gap-4" key={colIndex}>
                    {col.map((image, index) => (
                        <div key={index}>
                            <img className="h-auto max-w-full rounded-lg" src={image.src} alt={image.alt} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MasonryGrid;

interface Project {
    id: number;
    name: string;
    image: string;
}

export function MasonryGridGallery() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const projects = [
        {
            id: 1,
            name: "Project 1",
            image: "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        },
        {
            id: 2,
            name: "Project 2",
            image: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
        },
        {
            id: 3,
            name: "Project 3",
            image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        },
        {
            id: 4,
            name: "Project 4",
            image: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
            id: 5,
            name: "Project 5",
            image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            name: "Project 6",
            image: "https://docs.material-tailwind.com/img/team-3.jpg"
        },
    ];

    const handleImageClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {projects.map(project => (
                    <div key={project.id} className="relative group">
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                            src={project.image}
                            alt={project.name}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 rounded-lg">
                            <div className="text-center">
                                <h2 className="text-white text-lg font-bold mb-2">{project.name}</h2>
                                <button
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    onClick={() => handleImageClick(project)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center mb-4"
                            src={selectedProject.image}
                            alt={selectedProject.name}
                        />
                        <p className="mb-4">Detailed description of {selectedProject.name}.</p>
                        <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const imageSources = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
];

export const MasonryGridGallery2: React.FC = () => {
    return (


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-4">
                <div className='group relative hover:cursor-pointer'>
                    <img className="h-auto max-w-full rounded-lg object-cover object-center transition-transform duration-300 ease-in-out transform group-hover:scale-105" 
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" 
                        alt=""
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 rounded-lg">
                        <div className="text-center">
                            <h2 className="text-white text-lg font-bold mb-2">Project Name</h2>
                            <button
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                onClick={undefined}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
                </div>
            </div>
            <div className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
                </div>
            </div>
            <div className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                </div>
            </div>
            <div className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="" />
                </div>
            </div>
        </div>

    );
};
