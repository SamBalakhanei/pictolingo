'use server'
import Navbar from "../components/Navbar";
import LanguageBar from "app/createDeck/components/LanguageBar";
import CardList from "./components/CreateDeckCardList";
import { v4 } from "uuid";
const imgbbUploader = require("imgbb-uploader");

import dotenv from 'dotenv'
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";
import { redirect } from "next/navigation"
dotenv.config();

export default async function createDeck() {
  const session = await getServerSession(authConfig);

  if(!session){
    redirect('/login')
  }

  return (
    <>
      <Navbar />
      <div className="w-full pt-20 px-8 pb-24">
        <LanguageBar />
        <form className="mt-8">
          <div className="flex flex-col items-center">
            <input
              type="text"
              name="deckName"
              className="border-blue-600 border-4 rounded py-2 px-4 mb-4 w-full max-w-lg"
              placeholder="Deck Name"
              required
            />
            <CardList />
          </div>
        </form>
      </div>
    </>
  );
}
