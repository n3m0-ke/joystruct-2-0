'use client'

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfigFile";
import { collection, getDocs } from "firebase/firestore";

import { ProjectCard } from "./ProjectCard";
import { SectionTitle } from "./SectionTitle";

import MasonryGrid from './MasonryGrid';
import { MasonryGridGallery2 } from "./MasonryGrid";
import { Container } from "./Container";

interface Project {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
}

export default function ProjectsBody() {
  // const [projects, setProjects] = useState<Project[]>([]);

  const projects = [
    {
      "id": "1",
      "name": "Project 1",
      "description": "Description of project 1",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
          "alt": "Image description 1-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
          "alt": "Image description 1-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
          "alt": "Image description 1-3"
        }
      ]
    },
    {
      "id": "2",
      "name": "Project 2",
      "description": "Description of project 2",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
          "alt": "Image description 2-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
          "alt": "Image description 2-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
          "alt": "Image description 2-3"
        }
      ]
    },
    {
      "id": "3",
      "name": "Project 3",
      "description": "Description of project 3",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
          "alt": "Image description 3-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
          "alt": "Image description 3-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
          "alt": "Image description 3-3"
        }
      ]
    },
    {
      "id": "4",
      "name": "Project 4",
      "description": "Description of project 4",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
          "alt": "Image description 4-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
          "alt": "Image description 4-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
          "alt": "Image description 4-3"
        }
      ]
    },
    {
      "id": "5",
      "name": "Project 5",
      "description": "Description of project 5",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-12.jpg",
          "alt": "Image description 5-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-13.jpg",
          "alt": "Image description 5-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-14.jpg",
          "alt": "Image description 5-3"
        }
      ]
    },
    {
      "id": "6",
      "name": "Project 6",
      "description": "Description of project 6",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-15.jpg",
          "alt": "Image description 6-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-16.jpg",
          "alt": "Image description 6-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-17.jpg",
          "alt": "Image description 6-3"
        }
      ]
    },
    {
      "id": "7",
      "name": "Project 7",
      "description": "Description of project 7",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-18.jpg",
          "alt": "Image description 7-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-19.jpg",
          "alt": "Image description 7-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-20.jpg",
          "alt": "Image description 7-3"
        }
      ]
    },
    {
      "id": "8",
      "name": "Project 8",
      "description": "Description of project 8",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-21.jpg",
          "alt": "Image description 8-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-22.jpg",
          "alt": "Image description 8-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-23.jpg",
          "alt": "Image description 8-3"
        }
      ]
    },
    {
      "id": "9",
      "name": "Project 9",
      "description": "Description of project 9",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-24.jpg",
          "alt": "Image description 9-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-25.jpg",
          "alt": "Image description 9-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-26.jpg",
          "alt": "Image description 9-3"
        }
      ]
    },
    {
      "id": "10",
      "name": "Project 10",
      "description": "Description of project 10",
      "images": [
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-27.jpg",
          "alt": "Image description 10-1"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-28.jpg",
          "alt": "Image description 10-2"
        },
        {
          "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-29.jpg",
          "alt": "Image description 10-3"
        }
      ]
    }
  ]


  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const projectsCollection = collection(db, 'projects');
  //     const projectSnapshot = await getDocs(projectsCollection);
  //     const projectList = projectSnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as Project[];
  //     setProjects(projectList);
  //   };

  //   fetchProjects();
  // }, []);

  console.log(projects);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 backgroundPattern bg-opacity-20">

      <SectionTitle
        preTitle="Projects Page"
        title="Feature under development"
      >
      </SectionTitle>

      <Container>
        <div className="p-2 min-w-full">
          <MasonryGridGallery2 />
        </div>
        Something in this container
      </Container>


      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Project Name{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Project Description
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Project Name{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Project Description
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Project Name{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Project Description
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Project Name{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Project Description
          </p>
        </a>
      </div>



    </main>
  )
}