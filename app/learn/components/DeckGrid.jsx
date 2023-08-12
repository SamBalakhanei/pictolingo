"use client";
import { useState, useEffect } from "react";
import { getDecks } from "app/api/MongooseActions";
import { getUserEmail } from "../../createDeck/page";

import Link from "next/link";

export default function DeckGrid({ currentLanguage }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
          });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentLanguage]);

  if (isLoading) return <h2>Loading...</h2>;
  if (data.length === 0) return <h1>No decks available</h1>;

  return (
    <>
      {data.map((deck) => (
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
      ))}
    </>
  );
}
