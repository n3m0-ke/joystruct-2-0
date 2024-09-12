'use client'

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfigFile";
import { collection, getDocs } from "firebase/firestore";

import { ProjectCard } from "./ProjectCardUser";
import { SectionTitle } from "./SectionTitle";
import { Container } from "./Container";

import Layout from "react-masonry-list";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  console.log(projects);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 backgroundPattern bg-opacity-20">

      <SectionTitle
        preTitle="Projects"
        title="Explore Our Projects for Details"
      >
      </SectionTitle>

      <Container className="min-w-full">
        <div className="w-2/3 mx-auto md:w-2/3 sm:w-full">
            <Layout
            minWidth={100}
            items={projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            />
        </div>
        
      </Container>



    </main>
  )
}