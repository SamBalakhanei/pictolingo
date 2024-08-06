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
        <h1 className="md:font-bold text-9xl">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <>
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>

        <div className="w3-top">
          <div className="w3-bar w3-white w3-wide w3-padding w3-card ">
            <Link href="/" className="w3-bar-item w3-button">
              <b>Picto</b>Lingo
            </Link>
            <div className="w3-right w3-hide-small">
              <Link href="/learn" className="w3-bar-item w3-button">
                Learn
              </Link>
              {/* <Link href='/' className="w3-bar-item w3-button">Study</Link>
            <Link href='/' className="w3-bar-item w3-button">Test</Link> */}
              <Link
                href="/signout"
                className="w3-bar-item w3-button ring-2 ring-offset-blue-300"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </>

      <div className="w3-content w3-padding" style={{ maxWidth: "1564px" }}>
        <div
          className="position"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card deck={deck} />
        </div>
      </div>
    </>
  );
}
