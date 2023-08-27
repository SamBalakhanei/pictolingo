"use client";
import { useState, useEffect } from "react";
import { getDecks, deleteDeck } from "app/api/MongooseActions";
import { getUserEmail } from "../../api/ServerCalls";


import Link from "next/link";

export default function DeckGrid({ currentLanguage }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserEmail()
      .then((email) => {
        getDecks(currentLanguage, email)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            setIsError(true);
          });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setIsError(true);
      });
  }, [currentLanguage]);

  const handleDelete = (deckId) => {
    deleteDeck(deckId)
      .then(() => {
        // Remove the deleted deck from the data array
        const updatedData = data.filter(deck => deck.deck.id !== deckId);
        setData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h1>Error retrieving decks</h1>
  if (data.length === 0) return <h1>You haven't created any decks yet!</h1>;

  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      {data.map((deck) => (
        <div key={deck.deck.id} style={{ position: "relative" }}>
          <Link
            key={deck.deck.id}
            href={`/ViewDeck/${deck.deck.id}`}
            className="w3-btn"
            style={{
              backgroundColor: "#794c4c",
              color: "#ffffff",
              padding: "75px",
              textAlign: "center",
              display: "block",
            }}
          >
            {deck.deck.title}
          </Link>
          <button
            onClick={() =>{
              const shouldDelete = window.confirm("Are you sure you want to delete this deck?");
              if(shouldDelete){
                handleDelete(deck.deck.id)
              }
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "white",
              border: "none",
              padding: "8px 15px",
              cursor: "pointer",
              fontSize: "24px"
            }}
            className="hover:bg-red-500 bg-red-600"
          ><i className="fa fa-trash"></i></button>
        </div>
      ))}
    </>
  );
}
