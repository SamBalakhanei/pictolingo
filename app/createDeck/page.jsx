'use server'
import Navbar from "../components/Navbar";
import LanguageBar from "app/createDeck/components/LanguageBar";
import CardList from "./components/CreateDeckCardList";
import { v4 } from "uuid";
const imgbbUploader = require("imgbb-uploader");


import dotenv from 'dotenv'
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";
import {redirect} from "next/navigation"
dotenv.config();



export default async function createDeck() {
  const session = await getServerSession(authConfig);

  if(!session){
    redirect('/login')
  }

  
  return (
    <>
      <Navbar />
      <div className="w3-content w3-padding" style={{ maxWidth: "1564px" }}>
        <LanguageBar />
        <form>
          <input
            type="text"
            name="deckName"
            className=" border-blue-600 border-4 rounded py-1"
            placeholder="Deck Name"
            required
          />
          <CardList />
          <br></br>
        </form>
      </div>
    </>
  );
}



export async function uploadImage(image,index){
  try{
    const res = await imgbbUploader({
    apiKey: process.env.IMGBB_API_KEY,
    name: "image1-"+index+v4(),
    base64string: image
  })
  return res.url;
  } catch {
    console.error("gyat")
  }
}

export async function getUserEmail(){
  const session = await getServerSession(authConfig);
  return session?.user?.email;
}
