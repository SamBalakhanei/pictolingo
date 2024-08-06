import { SignOutButton } from "../components/authButtons";
import Navbar from "../components/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center w-full max-w-md mt-10 p-8 shadow-lg rounded-lg bg-white">
          <h1 className="mt-10 mb-4 text-4xl text-gray-800 font-bold text-center">Are you sure you want to sign out?</h1>
          <SignOutButton />
        </div>
      </div>
    </>
  );
}
