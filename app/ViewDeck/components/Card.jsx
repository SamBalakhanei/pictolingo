"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link.js";

export default function Card(deck) {
  try {
    deck = deck.deck[0].deck;
  } catch {
    console.log("null reading");
  }

  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(deck.cards[index].img1);
  const [alt, setAlt] = useState("img1");
  const [flipped, setFlipped] = useState(false);
  const [viewResults, setViewResults] = useState(false);

  const [wrong, setWrong] = useState([]);
  const [correct, setCorrect] = useState([]);
  const total = deck.cards.length;

  function flipCard() {
    if (!flipped) {
      setImage(deck.cards[index].img2);
      setAlt("img2");
      setFlipped(true);
    } else {
      setFlipped(false);
      setImage(deck.cards[index].img1);
      setAlt("img1");
    }
  }

  function answerWrong() {
    setWrong([...wrong, deck.cards[index]]);
    updateCard(false);
  }

  function skipCard() {
    deck.cards.push(deck.cards[index]);
    deck.cards.splice(index, 1);
    setImage(deck.cards[index].img1);
  }

  function answerCorrect() {
    setCorrect([...correct, deck.cards[index]]);
    updateCard(true);
  }

  function showResults(checker) {
    setViewResults(true);
    if (checker) {
      console.log("Total Correct : " + (correct.length + 1));
      console.log("Total Incorrect: " + wrong.length);
      console.log("Final Score: " + ((correct.length + 1) / total) * 100);
    } else {
      console.log("Total Correct : " + correct.length);
      console.log("Total Incorrect: " + (wrong.length + 1));
      console.log("Final Score: " + (correct.length / total) * 100);
    }
  }

  function updateCard(checker) {
    if (index === deck.cards.length - 1) {
      showResults(checker);
    } else {
      setIndex(index + 1);
      setImage(deck.cards[index + 1].img1);
    }
  }

  if (viewResults === false) {
    return (
      <div
        style={{
          border: "2px solid #000",
          borderRadius: "8px",
          padding: "20px",
          width: "600px",
          height: "700px",
          flexDirection: "column",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Image
          src={image}
          alt={alt}
          width={550}
          height={550}
          onClick={flipCard}
          className="w3-btn"
          style={{
            objectFit: "contain",
            padding: "50px",
          }}
        />

        <div
          style={{
            padding: "10px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
          }}
        >
          <button
            className="w3-button w3-red w3-hover-red w3-hover-opacity"
            onClick={answerWrong}
            style={{
              flexGrow: "1",
              margin: "0 5px",
            }}
          >
            X
          </button>

          <button
            className="w3-button w3-yellow w3-hover-yellow w3-hover-opacity"
            onClick={skipCard}
            style={{
              flexGrow: "1",
              margin: "0 5px",
            }}
          >
            {" "}
            {">>"}{" "}
          </button>
          <button
            className="w3-button w3-green w3-hover-green w3-hover-opacity"
            onClick={answerCorrect}
            style={{
              flexGrow: "1",
              margin: "0 5px",
            }}
          >
            ./
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div style={{ marginTop: "10px" }}>
          <h1>Total Correct: {correct.length}</h1>
          <h1>Total Incorrect: {wrong.length}</h1>
          <h1>Final Score: {(correct.length / total) * 100}%</h1>
          {/* <Link className='w3-button' href={`/ViewDeck/${deck.id}/incorrect`}>View Incorrect</Link> */}
        </div>
      </>
    );
  }
}
