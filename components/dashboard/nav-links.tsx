'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: DocumentDuplicateIcon,
    },
    { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map ((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'p-3 text-sm text-white flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-black hover:border-neutral-700 font-medium hover:bg-neutral-800/30 hover:text-yellow-500 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-neutral-800/50 text-yellow-400 border-neutral-800': pathname === link.href,
                },
              )}
              >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }