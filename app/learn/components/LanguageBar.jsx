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
        <div className="w3-container w3-padding-32 btn-group">
          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">
            Select Language
          </h3>
          {languages.map((lang) => (
            <button
              className="w3-hover-opacity"
              key={lang}
              onClick={() => setCurrentLanguage(lang)}
              style={{
                backgroundColor: lang === currentLanguage ? "#395c8a" : "#2E2E2E",
                border: "1px solid rgb(53, 54, 53)",
                color: "white",
                padding: "10px 24px",
                cursor: "pointer",
                float: "left",
                
              }}
            >
              {lang}
            </button>
          ))}
        </div>
        <LearnDecks currentLanguage={currentLanguage}/>
      </>
    );
  }
  