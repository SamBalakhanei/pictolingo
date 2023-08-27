import { SignOutButton } from "../components/authButtons"
import Navbar from "../components/Navbar"

export default function page() {
  return (
    <>
    <Navbar />
        <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center mt-10 p-10 shadow-lg bg-slate-200">
                <h1 className="mt-10 mb-4 text-4xl font-bold">Are you sure you want to sign out?</h1>
                <SignOutButton />
            </div>

        </div>
        
    </>
  )
}
