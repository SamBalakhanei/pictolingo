"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function FlippingImageCard() {
  const [image, setImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prevImage) => !prevImage);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" cursor-default flip-container border-2 border-gray-800 rounded-lg p-6 w-full max-w-lg flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg">
      
      <div className={`flip-card ${image ? 'flip' : ''}`}>
        {image ? (
          <Image
            src="https://i.ibb.co/LdkpJdT/image1-0fd392347-772b-4091-8160-764a451d9503.webp"
            alt="image holder"
            width={256}
            height={250}
            className=" rounded-lg"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className=" flex justify-center items-center rounded-lg p-6 w-full h-64 text-2xl text-black">
            <span style={{ wordBreak: "break-word" }}>犬</span>
          </div>
        )}
      </div>

      <div className="flex justify-around mt-4 w-full">
        <button className="cursor-default flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-10 rounded-full hover:bg-red-400 transition duration-300 ease-in-out border border-black">
          <span className="text-xl">✗</span>
        </button>
        <button className="cursor-default flex items-center justify-center bg-gray-500 text-white font-semibold py-2 px-10 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out border border-black">
          <span className="text-xl">≫</span>
        </button>
        <button className="cursor-default flex items-center justify-center bg-green-500 text-white font-semibold py-2 px-10 rounded-full hover:bg-green-400 transition duration-300 ease-in-out border border-black">
          <span className="text-xl">✔</span>
        </button>
      </div>
    </div>
  );
}
