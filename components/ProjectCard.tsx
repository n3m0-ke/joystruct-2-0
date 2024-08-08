import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import React, { useState } from 'react';
import EditProjectDialog from "./dashboard/EditProjectDialog";
import { Project } from "./dashboard/projectsBody";

interface ProjectCardProps {
    id: string;
    imageUrls: string[];
    projectName: string;
    description: string;
    videoUrl?: string;
    completionYear: string;
    updateProject: (updatedProject: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, imageUrls, projectName, description, videoUrl, completionYear, updateProject }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = (updatedProject?: Project) => {
        if (updatedProject) {
            updateProject(updatedProject);
        }
        setOpen(false);
    };

    return (
        <div>
            <Card 
                className="w-full h-80 max-w-[48rem] flex-row bg-opacity-15 text-white hover:bg-opacity-25 hover:border-goldenrod"
                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
            >
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/5 shrink-0 rounded-r-none"
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    <img
                        src={imageUrls[0]} // Display only the first image
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody
                    className="h-full p-4 m-0 flex flex-col"
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    <div className="flex flex-col">
                        <Typography variant="h6" color="gray" className="mb-2 uppercase text-purple-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {projectName}
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            By Admin
                        </Typography>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <Typography color="gray" className="mt-2 font-normal text-zinc-300 overflow-y-auto h-24" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {description}
                        </Typography>
                    </div>

                    <div className="flex">
                        <Button
                            onClick={handleOpen}
                            disabled
                            className="flex items-start gap-2 text-goldenrod "
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            Edit
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </Button>
                        <EditProjectDialog
                            project={{ id, imageUrls, projectName, description, videoUrl, completionYear }}
                            open={open}
                            handleClose={handleClose}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
