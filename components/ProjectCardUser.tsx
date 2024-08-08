'use client'

import { useState } from "react";
import type { Project } from "./ProjectsBody";

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsModalOpen(true);

  return (
    <div
      className="relative p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={project.imageUrls[0]}
        alt={project.projectName}
        className={`w-full h-40 object-cover rounded-md ${isHovered ? "opacity-75" : ""}`}
      />
      <h3 className="text-xl font-bold mt-2">{project.projectName}</h3>

      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <p>{project.description}</p>
        </div>
      )}

      {isModalOpen && (
        <Modal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{project.projectName}</h2>
        <p>{project.description}</p>
        {project.videoUrl && (
          <video controls className="w-full mt-4">
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
}
