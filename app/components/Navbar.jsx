import { getServerSession } from "next-auth";
import Link from "next/link";
import { authConfig } from "../../lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authConfig);

  return (
    <div className="w-full fixed top-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-lg z-50">
      <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href='/' className="text-3xl font-extrabold text-white hover:text-yellow-300 transition duration-300 ease-in-out">
              <b>Picto</b>Lingo
            </Link>
          </div>
          <div className="flex-grow"></div>
          <div className="flex space-x-4">
            <Link href='/learn' className="text-xl text-white hover:text-yellow-300 transition duration-300 ease-in-out">
              Learn
            </Link>
            {session ? (
              <Link href='/signout' className="text-xl text-white hover:text-yellow-300 transition duration-300 ease-in-out">
                Sign Out
              </Link>
            ) : (
              <Link href='/login' className="text-xl text-white hover:text-yellow-300 transition duration-300 ease-in-out">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
