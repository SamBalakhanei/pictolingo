'use server'
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";
import { v4 } from 'uuid';
import dotenv from 'dotenv'
dotenv.config();

const imgbbUploader = require("imgbb-uploader");


export async function uploadImage(image: String,index: number){
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
  