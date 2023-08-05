'use client'
import { useState, useEffect } from "react";
import Navbar from "app/components/Navbar";
import Card from "app/ViewDeck/components/Card";
import { getOneDeck } from "app/api/MongooseActions";

export default function ViewDeck({params}) { 


  const [deck, setDeck] = useState({})
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
          console.error('Error fetching deck:', error);
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
    return <div className="h-screen flex items-center justify-center">
      <h1 className="md:font-bold text-9xl">Loading...</h1></div>;
  }


  return (
    <>
      <Navbar />
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
