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
            <Card className="w-full h-80 flex-row bg-neutral-900 border border-neutral-700 text-white hover:border-teal-500 transition"
                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                <CardHeader className="m-0 w-2/5 shrink-0 rounded-r-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    <img src={imageUrls[0]} alt={projectName} className="h-full w-full object-cover" />
                </CardHeader>
                <CardBody className="flex flex-col p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    <h3 className="text-lg font-semibold text-teal-400">{projectName}</h3>
                    <p className="flex-1 text-sm text-gray-300 overflow-y-auto">{description}</p>
                    <Button onClick={handleOpen} className="mt-4 bg-goldenrod hover:bg-yellow-600 text-black font-bold" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >Edit</Button>
                </CardBody>
            </Card>

        </div>
    );
};

// placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
