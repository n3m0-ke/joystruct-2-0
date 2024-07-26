import Image from 'next/image'
import HomeBody from '@/components/HomeBody'
import StickyNavbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <StickyNavbar />
      <HomeBody />
    </>
  )
}
