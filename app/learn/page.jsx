import Navbar from "../components/Navbar.jsx";
import LanguageBar from "./components/LanguageBar.jsx";
import Link from "next/link.js";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";

export default async function LearnPage() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <Navbar />
      <div className="max-w-full pt-20 px-8">
        <LanguageBar />
        <div className="flex justify-center mt-8">
          <Link href='/createDeck' className='text-white bg-indigo-600 border border-indigo-600 rounded-full px-6 py-3 hover:bg-indigo-500 hover:text-gray-100 transition duration-300 ease-in-out'>
            Create New Deck
          </Link>
        </div>
      </div>
    </>
  );
}
