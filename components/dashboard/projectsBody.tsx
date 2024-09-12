'use client';

import { useEffect, useState } from 'react';
import { Container } from '../Container';
import { ProjectCard } from '../ProjectCard';
import ProjectsInputForm from './ProjectInput';
import { db } from '@/firebaseConfigFile';
import { collection, getDocs, query, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

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

            // Create a Set to track unique IDs
            const existingIds = new Set(projects.map(project => project.id));

            // Filter out duplicates
            const newProjects = projectList.filter(project => !existingIds.has(project.id));

            // Remove duplicates and update state
            setProjects(prevProjects => {
                const allProjects = [...prevProjects, ...newProjects];
                const uniqueProjects = Array.from(new Set(allProjects.map(p => p.id)))
                    .map(id => allProjects.find(p => p.id === id)!);
                return uniqueProjects;
            });

            setLastDoc(projectSnapshot.docs[projectSnapshot.docs.length - 1]);

        } catch (error) {
            console.error("Error fetching projects: ", error);
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
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === updatedProject.id ? updatedProject : project
            )
        );
    };

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">Projects</h1>

            <Container className="flex w-full flex-col mt-4">
                <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
                    New Project
                </div>

                <div className="w-100 p-0 m-0">
                    <ProjectsInputForm />
                </div>
            </Container>

            <Container>
                <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
                    Edit Projects ({projects.length})
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {!loading && projects.map((project) => (
                        <div key={project.id} className="bg-transparent p-6 rounded-lg shadow-lg">
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
                {loading && <div>Loading...</div>}
                {lastDoc && (
                    <button
                        onClick={() => fetchProjects(lastDoc)}
                        className="mt-4 px-4 py-2 bg-purple-700 text-white rounded"
                    >
                        Load More
                    </button>
                )}
            </Container>
        </main>
    );
}
