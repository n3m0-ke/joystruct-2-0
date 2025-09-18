'use client';

import { Dialog } from '@headlessui/react';
import { useState, useRef } from 'react';
import { db, storage } from '@/firebaseConfigFile';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Project } from './projectsBody';

interface EditProjectDialogProps {
  project: Project;
  open: boolean;
  handleClose: (updatedProject?: Project) => void;
}

export default function EditProjectDialog({ project, open, handleClose }: EditProjectDialogProps) {
  const [projectName, setProjectName] = useState(project.projectName);
  const [completionYear, setCompletionYear] = useState(project.completionYear);
  const [description, setDescription] = useState(project.description);
  const [images, setImages] = useState<string[]>(project.imageUrls || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState(project.videoUrl || '');
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  // select images
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setNewImages(Array.from(e.target.files));
  };

  // select video
  const onVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setNewVideo(e.target.files[0]);
  };

  // save updates
  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData: Partial<Project> = {
        projectName,
        completionYear,
        description,
      };

      // upload new images if any
      if (newImages.length > 0) {
        const urls = await Promise.all(
          newImages.map(async (file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
          })
        );
        updatedData.imageUrls = urls;
      } else {
        updatedData.imageUrls = images;
      }

      // handle video or YouTube
      if (newVideo) {
        const storageRef = ref(storage, `videos/${newVideo.name}`);
        await uploadBytes(storageRef, newVideo);
        updatedData.videoUrl = await getDownloadURL(storageRef);
      } else {
        updatedData.videoUrl = videoUrl;
      }

      // update Firestore
      const projectRef = doc(db, 'projects', project.id);
      await updateDoc(projectRef, updatedData);

      // return updated object to parent
      handleClose({
        ...project,
        ...updatedData,
      } as Project);
    } catch (err) {
      console.error("Error updating project:", err);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => handleClose()} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-lg p-6 text-white">
          <Dialog.Title className="text-xl font-semibold text-teal-400 mb-4">Edit Project</Dialog.Title>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none"
              placeholder="Project Name"
            />

            <input
              type="text"
              value={completionYear}
              onChange={(e) => setCompletionYear(e.target.value)}
              className="w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none"
              placeholder="Completion Year"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none"
              placeholder="Description"
            />

            {/* Existing images */}
            <div className="flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img src={img} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-xs text-white px-1"
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* New image upload */}
            <input type="file" multiple ref={fileInputRef} onChange={onFileSelect} />

            {/* Video / YouTube */}
            <div>
              <label className="text-teal-400 text-sm">Video or YouTube URL</label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none mt-2"
                placeholder="YouTube link"
              />
              <input type="file" ref={videoInputRef} onChange={onVideoSelect} className="mt-2" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => handleClose()}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 rounded bg-teal-600 hover:bg-teal-500"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
