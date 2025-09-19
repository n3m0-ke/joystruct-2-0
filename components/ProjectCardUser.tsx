'use client';

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { Project } from "./ProjectsBody";
import { FeaturedImageGallery } from "./FeaturedImageGallery";

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="project-card rounded-lg overflow-hidden shadow-md border-t-4 border-teal-500 relative">
      {/* Project Thumbnail */}
      <img
        src={project.imageUrls[0]}
        alt={project.projectName}
        className="w-full h-64 object-cover transition duration-300"
      />

      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-2">
          {project.projectName}
        </h3>
        <p className="text-gray-400 line-clamp-2">{project.description}</p>
      </div>

      {/* Persistent Bottom-Right Button */}
      <div className="mt-1 flex justify-end p-2">
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-3 py-2 rounded-full 
                 text-teal-400 border border-teal-500
                 hover:bg-teal-500 hover:text-white hover:scale-105 
                 transition duration-200 shadow-md"
        >
          <span className="hidden sm:inline">More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* HeadlessUI Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl rounded-2xl bg-neutral-900 p-6 text-white border border-teal-500">
                  <Dialog.Title className="text-2xl font-bold text-teal-400 mb-4">
                    {project.projectName}
                  </Dialog.Title>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Gallery */}
                    <FeaturedImageGallery images={project.imageUrls} />

                    {/* Project Info */}
                    {/* Project Info */}
                    <div className="flex flex-col">
                      {project.videoUrl ? (
                        <div className="aspect-video mb-4 w-full overflow-hidden rounded-lg border border-gray-700">
                          <video
                            controls
                            src={project.videoUrl}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <p className="mb-4 text-red-400 text-sm italic">
                          No video available for this project.
                        </p>
                      )}

                      <h4 className="text-lg font-semibold text-teal-300 mb-2">
                        {project.projectName}
                      </h4>
                      <p className="text-gray-300">{project.description}</p>
                      <p className="mt-4 text-sm text-gray-500">
                        Completed: {project.completionYear}
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
