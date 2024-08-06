'use client'
import { useState } from "react";
import LearnDecks from "./LearnDecksList";

export default function LanguageBar() {
  const languages = [
    "English",
    "Spanish",
    "French",
    "Italian",
    "Chinese",
    "Japanese",
  ];
  const [currentLanguage, setCurrentLanguage] = useState("English")

  return (
    <>
      <div className="w-full p-8 flex flex-col items-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-lg rounded-lg mt-5">
        <h3 className="text-2xl font-bold mb-6 text-white">Select Language</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {languages.map((lang) => (
            <button
              className={`px-6 py-2 rounded-full text-white font-semibold transition duration-300 ease-in-out ${
                lang === currentLanguage
                  ? 'bg-yellow-500 hover:bg-yellow-400'
                  : 'bg-indigo-900 hover:bg-indigo-800'
              }`}
              key={lang}
              onClick={() => setCurrentLanguage(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
      <LearnDecks currentLanguage={currentLanguage} />
    </>
  );
}
