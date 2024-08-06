import { getServerSession } from "next-auth";
import Link from "next/link";
import { authConfig } from "../lib/auth";
import Navbar from "./components/Navbar";

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  const userName = session?.user?.name;
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center mt-20 min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        <div
          className="flex flex-col items-center mt-10 p-10 shadow-lg text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          {session ? (
            <h3 className="text-2xl font-bold text-center">
              Hello <span className="text-indigo-200">{userName}</span>! Click
              <Link href="/learn" className="text-yellow-300 hover:text-yellow-100"> Learn </Link>

               to view your decks!
            </h3>
          ) : (
            <h3 className="text-2xl font-bold text-center">
              Hello!{" "}
              <Link
                href="/login"
                className="hover:text-yellow-300 text-yellow-200"
              >
                Sign in
              </Link>{" "}
              to get started.
            </h3>
          )}
        </div>

        <div name="about">
          <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-xl shadow-xl mt-40 transform">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-700">
              Welcome to PictoLingo: <span className="animate-bounce">🌟</span>{" "}
              Your Ultimate Picture-Based Learning Platform!{" "}
              <span className="animate-spin">📸</span>
            </h1>

            <p className="text-lg text-gray-800 mb-6">
              Are you tired of traditional flashcards and boring study methods?
              Look no further! PictoLingo is here to revolutionize your learning
              experience. Say goodbye to dull text-based quizzes and say hello
              to a visually engaging way of studying.
            </p>

            <div className="border-t border-gray-300 my-6"></div>

            <h2 className="text-3xl font-bold text-indigo-700">
              <span className="animate-pulse">🤔</span> What is PictoLingo?
            </h2>

            <p className="text-lg text-gray-800 mb-6">
              PictoLingo is a cutting-edge online platform designed to enhance
              your learning through images. It's the perfect blend of technology
              and education, allowing you to create personalized decks of cards,
              each featuring a picture on one side and relevant content on the
              other. Whether you're a student looking to ace your exams, a
              language enthusiast aiming to master vocabulary, or simply someone
              who loves to learn, PictoLingo is your ideal companion.
            </p>

            <div className="border-t border-gray-300 my-6"></div>

            <h2 className="text-3xl font-bold text-indigo-700">
              <span className="animate-bounce">🌟</span> Why Choose PictoLingo?
            </h2>

            <ul className="list-disc list-inside text-lg text-gray-800 mb-6">
              <li className="mb-2">
                Visual Learning at its Best: Research shows that visual aids
                significantly improve memory retention. PictoLingo harnesses
                this power by integrating images with information, making your
                learning process more effective and enjoyable.
              </li>
              <li className="mb-2">
                Create and Customize: With PictoLingo, you're in control. Craft
                your own decks using pictures from our extensive library or
                upload your own images. Tailor each card to your preferences and
                needs, ensuring your study material aligns perfectly with your
                goals.
              </li>
              <li className="mb-2">
                Efficiency Redefined: Say goodbye to sifting through countless
                pages of notes. PictoLingo enables you to condense information
                into bite-sized cards, focusing on key points. This means more
                efficient learning and better results in less time.
              </li>
            </ul>

            <div className="border-t border-gray-300 my-6"></div>

            <h2 className="text-3xl font-bold text-indigo-700">
              <span className="animate-pulse">🚀</span> How to Use PictoLingo
            </h2>

            <ol className="list-decimal list-inside text-lg text-gray-800 mb-6 pl-4">
              <li className="mb-2">
                Log In: Simply log in to access your cards and get started.
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

            <div className="border-t border-gray-300 my-6"></div>

            <h2 className="text-3xl font-bold text-indigo-700">
              <span className="animate-bounce">🚀</span> Join the Learning
              Revolution Today!
            </h2>

            <p className="text-lg text-gray-800 mb-6">
              Embrace the power of visual learning with PictoLingo. Say goodbye
              to monotonous study sessions and welcome a dynamic, engaging, and
              effective way to learn. Get ready to skyrocket your knowledge and
              skills with PictoLingo by your side. Start creating your first
              deck today and experience the joy of learning through pictures!{" "}
              <span className="animate-pulse">📚✨</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
