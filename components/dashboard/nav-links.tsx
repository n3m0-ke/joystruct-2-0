'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Projects', href: '/admin/projects', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon },
  { name: 'Employees', href: '/admin/employees', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'p-3 text-sm flex h-[48px] grow items-center justify-center gap-2 rounded-md border font-medium transition md:flex-none md:justify-start md:p-2 md:px-3',
              isActive
                ? 'bg-teal-600/20 text-teal-400 border-teal-600'
                : 'text-gray-300 border-neutral-800 hover:bg-neutral-800/40 hover:text-teal-400 hover:border-teal-600'
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
