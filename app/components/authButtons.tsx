"use client";
import Image from "next/image";
import googleLogo from "public/googleLogo.png";
import { signIn, signOut } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", { callbackUrl: "http://pictolingo.vercel.app" });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <Image src={googleLogo} alt="Google Logo" width={24} height={24} />
      <div className="ml-4">Continue with Google</div>
    </button>
  );
}

export function SignOutButton() {
  const handleClick = () => {
    signOut({ callbackUrl: "https://pictolingo.vercel.app" });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="ml-4">Sign Out</div>
    </button>
  );
}
