import { getServerSession } from "next-auth";
import Link from "next/link";
import { authConfig } from "../lib/auth";
import Navbar from "./components/Navbar";
import FlippingImageCard from "./components/FlippingImageCard"; // import the new client component

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center min-h-screen bg-white pt-24 pb-16">
        <div className="flex max-[600px]:flex-col flex-row items-center max-w-6xl w-full px-4 text-center">
          <div className="mr-4">
            <h1 className="min-[640px]:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 pb-1">
              Say goodbye to dull flashcards and hello to<br></br>
              visual learning!
              
            </h1>
            <p className="mt-4 text-gray-600 sm:text-lg max-w-3xl">
              Are you tired of traditional flashcards and boring study methods?
              PictoLingo is here to revolutionize your learning experience!
            </p>
            {session ? (
              <Link href="/learn">
                <button className="mt-6 bg-indigo-800 hover:bg-indigo-700 text-white py-3 px-6 rounded-full transition duration-300 max-[600px]:mb-5">
                  View Decks
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="mt-6 bg-indigo-800 hover:bg-indigo-700 text-white py-3 px-6 rounded-full transition duration-300 max-[600px]:mb-5">
                  Log in
                </button>
              </Link>
            )}
          </div>
          <FlippingImageCard /> {/* use the new client component */}
        </div>

        <div className="w-full max-w-4xl space-y-8 mt-12 px-4">
          <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold text-indigo-700">
              <span className="rotate-emoji">🤔</span> What is PictoLingo?
            </h2>
            <p className="text-lg text-gray-800 mt-4">
              PictoLingo is the perfect blend of technology and education,
              allowing you to create personalized decks of cards, each featuring
              a picture on one side and relevant content on the other. Whether
              you're a student looking to ace your exams, a language enthusiast
              aiming to master vocabulary, or simply someone who loves to learn,
              PictoLingo is your ideal companion.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold text-indigo-700">
              <span className="blink-emoji">👀</span> How to Use It
            </h2>
            <ol className="list-decimal list-inside text-lg text-gray-800 mt-4 pl-4">
              <li className="mb-2">
                Log In: Simply log in to access your decks and get started.
              </li>
              <li className="mb-2">
                Create a Deck: Click on the "Create Deck" button to begin
                crafting your personalized study materials. Give your deck a
                meaningful title to easily identify its content.
              </li>
              <li className="mb-2">
                Add Cards: For each card, choose an image that captures the
                essence of the content. This could be a diagram, a photo, an
                illustration, or anything else that resonates with you. On the
                flip side, input the relevant information or question.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
