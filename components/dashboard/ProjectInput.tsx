'use client';

import React, { useRef, useState } from 'react';
import { db, storage } from '@/firebaseConfigFile';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from "next/image";

interface FileData {
  name: string;
  url: string;
}

const MAX_IMAGES = 5;

const ProjectsInputForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [completionYear, setCompletionYear] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<FileData[]>([]);
  const [videoFile, setVideoFile] = useState<FileData | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  // 📷 Select images
  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles: FileData[] = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    if (images.length + newFiles.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImages((prev) => [...prev, ...newFiles]);
  };

  // 🎥 Select video
  const onVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (youtubeUrl) {
      alert("Remove YouTube URL before uploading a video file.");
      return;
    }

    const videoFile: FileData = {
      name: files[0].name,
      url: URL.createObjectURL(files[0]),
    };

    setVideoFile(videoFile);
  };

  const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoFile) {
      alert("Remove uploaded video before adding a YouTube link.");
      return;
    }
    setYoutubeUrl(e.target.value);
  };

  // ❌ Delete
  const deleteImage = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));
  const deleteVideo = () => setVideoFile(null);

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length < 1) {
      alert("Please upload at least 1 image.");
      return;
    }

    setLoading(true);

    try {
      // Upload images
      const imageUrls = await Promise.all(
        images.map(async (img) => {
          const imgRef = ref(storage, `images/${img.name}`);
          const response = await fetch(img.url);
          const blob = await response.blob();
          await uploadBytes(imgRef, blob);
          return await getDownloadURL(imgRef);
        })
      );

      let videoUrl = '';
      if (videoFile) {
        const videoRef = ref(storage, `videos/${videoFile.name}`);
        const response = await fetch(videoFile.url);
        const blob = await response.blob();
        await uploadBytes(videoRef, blob);
        videoUrl = await getDownloadURL(videoRef);
      } else if (youtubeUrl) {
        videoUrl = youtubeUrl; // store directly
      }

      await addDoc(collection(db, 'projects'), {
        projectName,
        completionYear,
        description,
        imageUrls,
        videoUrl,
      });

      setSuccess(true);
      setProjectName('');
      setCompletionYear('');
      setDescription('');
      setImages([]);
      setVideoFile(null);
      setYoutubeUrl('');
    } catch (error) {
      console.error("Error adding project:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && <div className="text-green-500">Project added successfully!</div>}

      {/* Project Name */}
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none"
        required
      />

      {/* Year */}
      <input
        type="text"
        placeholder="Completion Year"
        value={completionYear}
        onChange={(e) => setCompletionYear(e.target.value)}
        pattern="\d{4}"
        className="w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none"
        required
      />

      {/* Image Upload */}
      <div>
        <label className="text-teal-400">Upload Images ({images.length}/{MAX_IMAGES})</label>
        <input type="file" multiple ref={fileInputRef} onChange={onFileSelect} />
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((img, i) => (
            <div key={i} className="relative w-20 h-20">
              <img src={img.url} className="w-full h-full object-cover rounded" />
              <button type="button" className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs" onClick={() => deleteImage(i)}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Upload OR YouTube */}
      <div>
        <label className="text-teal-400">Upload Video or Add YouTube URL</label>
        <input type="file" ref={videoInputRef} onChange={onVideoSelect} />
        {videoFile && (
          <div className="relative mt-2">
            <video src={videoFile.url} controls className="w-full rounded" />
            <button type="button" className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs" onClick={deleteVideo}>×</button>
          </div>
        )}

        <input
          type="url"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={handleYoutubeChange}
          className="mt-2 w-full bg-black border-b border-teal-500 text-white p-2 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Project"}
      </button>
    </form>
  );
};

export default ProjectsInputForm;
