import Navbar from "./components/Navbar";
import Link from "next/link";
import { authConfig } from "../lib/auth";
import { getServerSession } from "next-auth";
import { getUserName } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  if(session){
    const userName = session?.user?.name;
    return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center mt-20 min-h-screen py-2">
        <div className="flex flex-col items-center mt-10 p-10 shadow-lg bg-slate-400">
          <h3>Hello {userName}! Click Learn at the top right to see your decks!</h3>
        </div>
      </div>
    </>
  );
  } else {
    return (
      <>
        <Navbar />
        <div className="w-full flex flex-col items-center mt-20 min-h-screen py-2">
          <div className="flex flex-col items-center w-1/3 mt-10 p-10 shadow-lg bg-slate-400">
            <h3>Hello! <Link href="/login" className="hover:text-teal-200 text-sky-600 ">Sign in</Link> to get started.</h3>
          </div>
        </div>
      </>
    );
  }

  
}
