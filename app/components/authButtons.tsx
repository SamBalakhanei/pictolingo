"use client";
import Image from "next/image";
import googleLogo from "public/googleLogo.png";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", { callbackUrl: "http://pictolingo.vercel.app" });
  };

  return (
    <button
      onClick={handleClick}
      className="hover:bg-slate-500 w-full flex items-center font-semibold 
      justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <div className="ml-4">Continue with Google</div>
    </button>
  );
}
