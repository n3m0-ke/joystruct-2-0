'use client'

import Image from 'next/image'
import HomeBody from '@/components/HomeBody'
import ProjectsBody from '@/components/ProjectsBody'
import AboutBody from '@/components/AboutBody'
import ContactBody from '@/components/ContactBody'

import StickyNavbar from '@/components/Navbar'
import { Footer } from '@/components/Footer'

import {useEffect} from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Home() {
  useEffect(() => {
    AOS.init({duration: 800, easing: "ease-in-out", once: true});
  })
  return (
    <>
      <StickyNavbar />
      <section id="home" className="hero-bg min-h-screen flex items-center pt-20"> 
        {/* Home Section */} 
        <HomeBody />
      </section>
      <section id="about" className="py-20"> 
        {/* About Section */} 
        <AboutBody />
      </section>
      <section id="projects" className="py-20"> 
        {/* Projects Section */}
        <ProjectsBody />
      </section>
      
      <section id="contact" className="py-20 bg-teal-600 text-white">
        <ContactBody />
      </section>
      <Footer />
    </>
  )
}
