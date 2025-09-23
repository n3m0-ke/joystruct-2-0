'use client';

import { useEffect, useState } from 'react';
import { Container } from '../Container';
import { ProjectCard } from '../ProjectCard';
import ProjectsInputForm from './ProjectInput';
import { db } from '@/firebaseConfigFile';
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export interface Project {
  completionYear: string;
  id: string;
  imageUrls: string[];
  projectName: string;
  description: string;
  videoUrl?: string;
}

export default function ProjectsBody() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false); // 👈 toggle state

  const fetchProjects = async (startAfterDoc: QueryDocumentSnapshot<DocumentData> | null = null) => {
    setLoading(true);
    try {
      const projectsCollection = collection(db, 'projects');
      const projectsQuery = startAfterDoc
        ? query(projectsCollection, limit(10), startAfter(startAfterDoc))
        : query(projectsCollection, limit(10));

      const projectSnapshot = await getDocs(projectsQuery);
      const projectList = projectSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];

      const existingIds = new Set(projects.map(project => project.id));
      const newProjects = projectList.filter(project => !existingIds.has(project.id));

      setProjects(prev => {
        const allProjects = [...prev, ...newProjects];
        const unique = Array.from(new Set(allProjects.map(p => p.id))).map(
          id => allProjects.find(p => p.id === id)!
        );
        return unique;
      });

      setLastDoc(projectSnapshot.docs[projectSnapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error fetching projects: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized) {
      fetchProjects();
      setInitialized(true);
    }
  }, [initialized]);

  const updateProject = (updatedProject: Project) => {
    setProjects(prev =>
      prev.map(project => (project.id === updatedProject.id ? updatedProject : project))
    );
  };

  return (
    <main className="space-y-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-400">Projects</h1>
        <span className="text-gray-400 text-sm">{projects.length} total</span>
      </div>

      {/* Add New Project */}
      <Container className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center justify-between w-full text-teal-400 font-semibold uppercase tracking-wide text-sm focus:outline-none"
        >
          {formOpen ? 'Hide New Project Form' : 'Add New Project'}
          {formOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-teal-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-teal-400" />
          )}
        </button>

        {/* Dropdown animation */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            formOpen ? 'max-h-[1000px] mt-6' : 'max-h-0'
          }`}
        >
          <ProjectsInputForm />
        </div>
      </Container>

      {/* Edit Projects */}
      <Container className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="mb-6 text-teal-400 font-semibold uppercase tracking-wide text-sm">
          Edit Projects
        </div>

        {loading && (
          <div className="flex items-center space-x-2 text-gray-400">
            <svg
              className="animate-spin h-5 w-5 text-teal-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Loading projects...</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-black bg-opacity-40 rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <ProjectCard
                id={project.id}
                imageUrls={project.imageUrls}
                projectName={project.projectName}
                description={project.description}
                videoUrl={project.videoUrl}
                completionYear={project.completionYear}
                updateProject={updateProject}
              />
            </div>
          ))}
        </div>

        {lastDoc && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => fetchProjects(lastDoc)}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded transition"
            >
              Load More
            </button>
          </div>
        )}
      </Container>
    </main>
  );
}
