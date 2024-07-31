'use client'

import { Textarea } from "@material-tailwind/react";
import { Container } from "../Container";
import { SectionTitle } from "../SectionTitle";
import { useState } from "react";
import ImageInput from "./ProjectInput";
import { ProjectCard } from "../ProjectCard";

export default function ProjectsBody() {
    const [images, setImages] = useState<{ name: string; url: string }[]>([]);
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
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4" action="">
                        <div className="bg-transparent p-6 rounded-lg shadow-lg">

                            {/* Project Name */}
                            <div className="flex w-full flex-col gap-6 mb-8">
                                <div className="relative">
                                <input 
                                    type="text" 
                                    id="projectName" 
                                    onChange={undefined}
                                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                <label htmlFor="projectName" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Project Name/Reference</label>
                                </div>
                            </div> 
                            {/* Project Completion */}
                            <div className="flex w-full flex-col gap-6 mb-8">
                                <div className="relative">
                                <input 
                                    type="text" 
                                    id="completionYear" 
                                    onChange={undefined}
                                    pattern="\d{4}"
                                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                <label htmlFor="completionYear" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Year of Completion</label>
                                </div>
                            </div>
                            {/* description */}
                            <div className="flex flex-row w-full mb-8">
                                <div className="flex w-full flex-col gap-6">
                                <div className="relative">
                                    <textarea 
                                        id="description" 
                                        rows={4}
                                        onChange={undefined}
                                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent border-0 border-b-2 border-purple-400 appearance-no text-white focus:outline-none focus:ring-0 focus:border-purple-600 focus:ring-purple-600 peer" placeholder=" " />
                                    <label htmlFor="description" className="absolute text-sm text-purple-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Description</label>
                                </div>
                                </div>
                            </div>

                        </div>

                        <div className="bg-transparent p-6 rounded-lg shadow-lg">
                            <ImageInput images={images} setImages={setImages} />
                        </div>

                        <button type="submit"
                            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            Submit Details
                        </button>

                    </form>
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