import Link from 'next/link';
import NavLinks from './nav-links';
import JSLogo from './Logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
    return (
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-16 items-end justify-start rounded-md bg-black bg-opacity-70 p-4 md:h-40"
          href="/"
        >
          <div className="w-32 text-white md:w-40">
            <JSLogo />
          </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-black bg-opacity-70 md:block"></div>
          <form
            // action={async () => {
            //   'use server';
            //   await signOut();
            // }}
          >
            <button className="p-3 text-sm text-white flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md border border-black hover:border-neutral-700 font-medium hover:bg-neutral-800/30 hover:text-yellow-500 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    );
  }
