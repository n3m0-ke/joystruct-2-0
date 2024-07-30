"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar, Typography, Button, MobileNav, IconButton } from '@material-tailwind/react';

export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname(); // use usePathname to get the current pathname
  const router = useRouter(); // use useRouter for navigation
  
  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact Us' },
      ].map((item) => (
        <Typography
          key={item.href}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} 
        >
          <Link href={item.href}>
            <span
              className={`flex items-center ${
                pathname === item.href
                  ? 'text-yellow-400'
                  : 'text-white'
              } hover:text-yellow-500`}
            >
              {item.label}
            </span>
          </Link>
        </Typography>
      ))}
    </ul>
  );
 
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-16 py-2 lg:px-24 lg:py-4 border-0 border-b-1 border-goldenrod bg-black bg-opacity-70"
    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium flex items-center justify-between"
          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} 
        >
          <span>
            <Image
              src="/img/logo.png"
              alt="JS"
              width="50"
              height="50"
            />
          </span>
          JoyStructurals
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} 
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
            <span>Sign in</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

