import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import React, { useState } from 'react';
import EditProjectDialog from "./dashboard/EditProjectDialog";

interface ProjectCardProps {
    id: string;
    imageUrls: string[];
    name: string;
    description: string;
    videoUrl?: string;
    completionYear: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, imageUrls, name, description, videoUrl, completionYear }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Card className="w-full max-w-[48rem] flex-row bg-opacity-15 text-white hover:bg-opacity-25 hover:border-goldenrod" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/5 shrink-0 rounded-r-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                    <img
                        src={imageUrls[0]} // Display only the first image
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Typography variant="h6" color="gray" className="mb-4 uppercase text-purple-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {name}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        By Admin
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal text-zinc-300 overflow-hidden max-h-20" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {description}
                    </Typography>
                    <Button
                        onClick={handleOpen}
                        className="flex items-start gap-2 text-goldenrod"
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
                        project={{ id, imageUrls, name, description, videoUrl, completionYear }}
                        open={open}
                        handleClose={handleClose}
                    />
                </CardBody>
            </Card>
        </div>
    );
};
