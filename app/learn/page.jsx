import Navbar from "../components/Navbar.jsx";
import LanguageBar from "./components/LanguageBar.jsx";
import Link from "next/link.js";

export default function LearnPage() {
  

  return (
    <>
      <Navbar />
      <div className="w3-content w3-padding" style={{ maxWidth: "1564px" }}>
        <LanguageBar />
        <Link className='w3-button w3-gray' href='/createDeck'>Create New Deck</Link>
      </div>
    </>
  );
}

