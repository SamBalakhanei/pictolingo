"use client";
import { useState } from "react";

export let [currentLanguage, setCurrentLanguage] = "";

export default function LanguageBar() {
  [currentLanguage, setCurrentLanguage] = useState("English")

  const languages = [
    "English",
    "Spanish",
    "French",
    "Italian",
    "Chinese",
    "Japanese",
  ];

  return (
    <>
      <div className="mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-4">
          Select Language
        </h3>
        <div className="flex flex-wrap justify-center space-x-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setCurrentLanguage(lang)}
              className={`px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out ${
                lang === currentLanguage
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export function getLanguage() {
  return currentLanguage;
}
