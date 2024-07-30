import Image from 'next/image'
import HomeBody from '@/components/HomeBody'
import StickyNavbar from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <StickyNavbar />
      <HomeBody />
      <Footer />
    </>
  )
}
