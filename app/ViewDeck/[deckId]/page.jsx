"use client";
import { useState, useEffect } from "react";
import Card from "app/ViewDeck/components/Card";
import { getOneDeck } from "app/api/MongooseActions";
import Link from "next/link";

export default function ViewDeck({ params }) {
  const [deck, setDeck] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // To avoid setting state on an unmounted component

    getOneDeck(params.deckId)
      .then((res) => {
        if (isMounted) {
          setDeck(res);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Error fetching deck:", error);
          setIsLoading(false);
        }
      });

    // Clean up the effect when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [params.deckId]); // Only run the effect when params.deckId changes

  // Render the loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="md:font-bold text-5xl text-black">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-full fixed top-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-lg z-50">
        <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link href='/' className="text-3xl font-extrabold text-white hover:text-yellow-300 transition duration-300 ease-in-out">
                <b>Picto</b>Lingo
              </Link>
            </div>
            <div className="flex-grow"></div>
            <div className="flex space-x-4">
              <Link href='/learn' className="text-xl text-white hover:text-yellow-300 transition duration-300 ease-in-out">
                Learn
              </Link>
              {/* {session ? (
                <Link href='/signout' className="text-xl text-white hover:text-yellow-300 transition duration-300 ease-in-out">
                  Sign Out
                </Link>
              ) : (
                <Link href='/login' className="text-xl text-white hover:text-yellow-300 transition duration-300 ease-in-out">
                  Login
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        <Card deck={deck} />
      </div>
    </>
  );
}
