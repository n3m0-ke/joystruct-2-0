'use client';

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfigFile";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { ProjectCard } from "./ProjectCardUser";

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
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // 🔹 for spinner in button
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProjects = async (loadMore = false) => {
    if (loadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const projectsRef = collection(db, "projects");
      let q = query(projectsRef, orderBy("completionYear", "desc"), limit(3));

      if (loadMore && lastDoc) {
        q = query(projectsRef, orderBy("completionYear", "desc"), startAfter(lastDoc), limit(3));
      }

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const projectList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];

        setProjects(prev => (loadMore ? [...prev, ...projectList] : projectList));
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        if (snapshot.docs.length < 3) {
          setHasMore(false); 
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-6 mt-4">
      {/* Section Header */}
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Our Projects
        </h2>
        <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        <p className="max-w-2xl mx-auto mt-4 text-gray-400">
          Explore our portfolio of structural designs and engineering solutions.
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <p className="text-center text-gray-400">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-400">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div data-aos="fade-up" data-aos-delay={index * 100} key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center mt-12" data-aos="fade-up">
          <button
            onClick={() => fetchProjects(true)}
            disabled={loadingMore}
            className="inline-flex items-center justify-center gap-2 border-2 border-teal-500 text-teal-500 
                       hover:bg-teal-500 hover:text-white px-8 py-3 rounded-md font-medium 
                       transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </>
            ) : (
              "View More Projects"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
