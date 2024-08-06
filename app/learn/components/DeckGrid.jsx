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

  if (isLoading) return <h2 className="text-center text-white">Loading...</h2>;
  if (isError) return <h1 className="text-center text-red-500">Error retrieving decks</h1>
  if (data.length === 0) return <h1 className="text-center text-white">You haven't created any decks yet!</h1>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {data.map((deck) => (
        <div key={deck.deck.id} className="relative bg-purple-800 text-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <Link
            key={deck.deck.id}
            href={`/ViewDeck/${deck.deck.id}`}
            className="block text-xl font-semibold mb-4"
          >
            {deck.deck.title}
          </Link>
          <button
            onClick={() => {
              const shouldDelete = window.confirm("Are you sure you want to delete this deck?");
              if (shouldDelete) {
                handleDelete(deck.deck.id);
              }
            }}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full focus:outline-none"
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ))}
    </div>
  );
}
