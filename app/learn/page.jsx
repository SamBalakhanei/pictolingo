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
      <div className="max-w-full pt-20">
        <LanguageBar />
        <Link className='text-white border border-white rounded px-4 py-2 hover:bg-indigo-300 hover:text-gray-700' href='/createDeck'>Create New Deck</Link>
      </div>
    </>
  );
}
