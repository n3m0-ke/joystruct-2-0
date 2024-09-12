import Image from 'next/image'
import HomeBody from '@/components/HomeBody'
import ProjectsBody from '@/components/ProjectsBody'
import AboutBody from '@/components/AboutBody'
import ContactBody from '@/components/ContactBody'

import StickyNavbar from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <StickyNavbar />
      <section id="home" className="min-h-screen top-body-section"> 
        {/* Home Section */} 
        <HomeBody />
      </section>
      <section id="about" className="min-h-screen body-section"> 
        {/* About Section */} 
        <AboutBody />
      </section>
      <section id="projects" className="min-h-screen body-section"> 
        {/* Projects Section */} 
        <ProjectsBody />
      </section>
      
      <section id="contact" className="min-h-screen body-section">
        <ContactBody />
      </section>
      <Footer />
    </>
  )
}
