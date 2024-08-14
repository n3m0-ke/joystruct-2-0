'use client';

import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";
import { FeaturedImageGallery } from "./FeaturedImageGallery";
import type { Project } from "./ProjectsBody";

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleOpen = () => {
    setIsModalOpen(true);
    setIsHovered(false);
  };
  const handleClose = () => setIsModalOpen(false);

  return (
    <div
      className="relative p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOpen}
    >
      <img
        src={project.imageUrls[0]}
        alt={project.projectName}
        className={`w-full h-auto object-cover rounded-md ${isHovered ? "opacity-75" : ""}`}
      />
      <h3 className="text-xl font-bold mt-2">{project.projectName}</h3>

      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <Button
            onClick={handleOpen}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            View Details
          </Button>
        </div>
      )}

      {/* Modal for Detailed View */}
      <Dialog 
        open={isModalOpen} 
        size="xl" 
        handler={handleClose}
        // dismiss={{ outsidePointerDown: handleClose }}
        animate={{
          mount: { scale: 1, opacity: 1 },
          unmount: { scale: 0.9, opacity: 0 },
        }} 
        className="w-full container p-4 bg-black bg-opacity-90  border border-goldenrod rounded-2xl"
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}>
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{project.projectName}</DialogHeader>
        <DialogBody className="grid grid-cols-1 md:grid-cols-2 gap-6" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {/* Left side: Image Gallery */}
          <FeaturedImageGallery images={project.imageUrls} />

          {/* Right side: Project Details */}
          <div className="flex flex-col">
            <Typography variant="h6" color="gray" className="mb-2 uppercase text-purple-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Project Details
            </Typography>

            {/* Video Section */}
            {project.videoUrl ? (
              <div className="mb-4">
                <video
                  controls
                  className="w-full h-auto rounded-lg"
                  src={project.videoUrl}
                />
              </div>
            ) : (
              <Typography variant="small" color="red" className="mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                No video available for this project.
              </Typography>
            )}

            {/* Project Info */}
            <div className="flex flex-col">
              <Typography variant="h6" color="gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {project.projectName}
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                By Admin
              </Typography>
              <Typography color="gray" className="mt-2 font-normal text-zinc-300" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {project.description}
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button variant="text" color="red" onClick={handleClose} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
