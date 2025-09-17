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

      {/* New Project */}
      <Container className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="mb-4 text-teal-400 font-semibold uppercase tracking-wide text-sm">
          Add New Project
        </div>
        <ProjectsInputForm />
      </Container>

      {/* Edit Projects */}
      <Container className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="mb-6 text-teal-400 font-semibold uppercase tracking-wide text-sm">
          Edit Projects
        </div>

        {loading && <div className="text-gray-400">Loading...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
