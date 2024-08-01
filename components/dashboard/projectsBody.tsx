'use client'

import { useEffect, useState } from "react";
import { Container } from "../Container";
import { ProjectCard } from "../ProjectCard";
import ProjectsInputForm from "./ProjectInput";
import { db } from "@/firebaseConfigFile";
import { collection, getDocs } from "firebase/firestore";

interface Project {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
}

export default function ProjectsBody() { 
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
          const projectsCollection = collection(db, 'projects');
          const projectSnapshot = await getDocs(projectsCollection);
          const projectList = projectSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];
          setProjects(projectList);
        };
    
        fetchProjects();
      }, []);  


    return (
        <main>
            <h1 className={`mb-4 text-xl md:text-2xl`}>
                Projects
            </h1>

            <Container className="flex w-full flex-col mt-4 ">
                <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
                    New Project
                </div>

                <div className="w-100 p-0 m-0">
                    <ProjectsInputForm />
                </div>
            </Container>

            <Container>
                <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
                    Edit Projects
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-transparent p-6 rounded-lg shadow-lg">
                            <ProjectCard 
                                imageUrl={project.imageUrl}
                                name={project.name}
                                description={project.description}
                            />
                        </div>
                    ))}
                </div>
            </Container>

        </main>
    )
}