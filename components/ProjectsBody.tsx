'use client'

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfigFile";
import { collection, getDocs } from "firebase/firestore";

import { ProjectCard } from "./ProjectCardUser";
import { SectionTitle } from "./SectionTitle";
import { Container } from "./Container";

// import Layout from "react-masonry-list";
import dynamic from "next/dynamic";

const MasonryLayout = dynamic(() => import("react-masonry-list"), { ssr: false });


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
      console.log("fetching projects...");
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
    <div className="container mx-auto px-6 mt-4">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Projects</h2>
                <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
                <p className="max-w-2xl mx-auto mt-4 text-gray-400">Explore our portfolio of structural designs and engineering solutions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="project-card rounded-lg overflow-hidden shadow-md" data-aos="fade-up" data-aos-delay="100">
                    <img src="http://static.photos/construction/640x360/1" alt="Project 1" className="w-full h-64 object-cover" />
                    <div className="p-6 border-t-4 border-teal-500">
                        <h3 className="text-xl font-heading font-semibold mb-2">Marina Bay Towers</h3>
                        <p className="text-gray-400">Commercial high-rise with innovative seismic design</p>
                    </div>
                </div>
                <div className="project-card rounded-lg overflow-hidden shadow-md" data-aos="fade-up" data-aos-delay="200">
                    <img src="http://static.photos/construction/640x360/2" alt="Project 2" className="w-full h-64 object-cover" />
                    <div className="p-6 border-t-4 border-teal-500">
                        <h3 className="text-xl font-heading font-semibold mb-2">Riverfront Residence</h3>
                        <p className="text-gray-400">Luxury residential complex with cantilever design</p>
                    </div>
                </div>
                <div className="project-card rounded-lg overflow-hidden shadow-md" data-aos="fade-up" data-aos-delay="300">
                    <img src="http://static.photos/construction/640x360/3" alt="Project 3" className="w-full h-64 object-cover" />
                    <div className="p-6 border-t-4 border-teal-500">
                        <h3 className="text-xl font-heading font-semibold mb-2">Tech Campus</h3>
                        <p className="text-gray-400">Sustainable corporate campus with green roofs</p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-12" data-aos="fade-up">
                <a href="#" className="inline-block border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 rounded-md font-medium transition duration-300">View More Projects</a>
            </div>
        </div>

    
    // <main className="flex min-h-screen flex-col items-center p-8 backgroundPattern bg-opacity-20">

    //   <SectionTitle
    //     preTitle="Explore Our Projects"
    //     title=""
    //   >
    //   </SectionTitle>

    //   <Container className="min-w-full">
    //     <div className="w-2/3 mx-auto md:w-2/3 sm:w-full">
    //         <MasonryLayout
    //         minWidth={100}
    //         items={projects.map((project) => (
    //           <ProjectCard key={project.id} project={project} />
    //         ))}
    //         />
    //     </div>        
    //   </Container>

    // </main>
  )
}