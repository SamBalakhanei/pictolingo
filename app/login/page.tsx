import { GoogleSignInButton } from "../components/authButtons";
import Navbar from "../components/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center w-full max-w-md mt-10 p-8 shadow-lg rounded-lg bg-white">
          <h1 className="mt-10 mb-4 text-4xl text-gray-800 font-bold">Sign In</h1>
          <p className="mb-8 text-gray-600 text-center">Sign in with your Google account to get started</p>
          <GoogleSignInButton />
        </div>
      </div>
    </>
  );
}
