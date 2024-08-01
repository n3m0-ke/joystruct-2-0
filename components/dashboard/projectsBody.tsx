'use client'

import { Textarea } from "@material-tailwind/react";
import { Container } from "../Container";
import { SectionTitle } from "../SectionTitle";
import { useState } from "react";
import ImageInput from "./ProjectInput";
// import ProjectCard from "./ProjectCard";
import { ProjectCard } from "../ProjectCard";



import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebaseConfig';
import ProjectsInputForm from "./ProjectInput";

export default function ProjectsBody() {
    
    
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
                    <div className="bg-transparent p-6 rounded-lg shadow-lg">
                        <ProjectCard />
                    </div>
                    <div className="bg-transparent p-6 rounded-lg shadow-lg">
                        {/* <ProjectCard /> */}
                    </div>
                </div>
            </Container>

        </main>
    )
}