import Link from 'next/link';
import NavLinks from './nav-links';
import JSLogo from './Logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-black">
      {/* Logo */}
      <Link
        className="mb-4 flex h-16 items-center justify-start rounded-md bg-neutral-900 p-4 md:h-20"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <JSLogo />
        </div>
      </Link>

      {/* Navigation + Sign Out */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-neutral-900 md:block"></div>
        <button
          onClick={handleSignOut}
          className="p-3 text-sm text-white flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md border border-teal-700 hover:bg-teal-600/20 hover:border-teal-500 hover:text-teal-400 font-medium transition md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
