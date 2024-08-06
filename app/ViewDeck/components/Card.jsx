"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      setImage(deck.cards[index].img2); //sets card to text (back)
      setAlt(`text${index}`);
      setFlipped(true);
    } else {
      setFlipped(false);
      setImage(deck.cards[index].img1); //sets card to the image (front)
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
    setFlipped(false); // Reset flipped state when skipping to the next card
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
      setFlipped(false); // Reset flipped state when moving to the next card
    }
  }

  if (!viewResults) {
    return (
      <div className="border-2 border-gray-800 rounded-lg p-6 w-full max-w-lg flex flex-col justify-center items-center bg-white shadow-lg">
        {!flipped ? (
          <Image
            src={image}
            alt={alt}
            width={500}
            height={500}
            onClick={flipCard}
            className="cursor-pointer rounded-lg"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            onClick={flipCard}
            className="cursor-pointer flex justify-center items-center border-2 border-gray-300 rounded-lg p-6 w-full h-96 text-2xl text-black"
          >
            <span style={{ wordBreak: "break-word" }}>{image}</span>
          </div>
        )}
        <div className="flex justify-around mt-4 w-full">
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-400 transition duration-300 ease-in-out"
            onClick={answerWrong}
          >
            X
          </button>
          <button
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition duration-300 ease-in-out"
            onClick={skipCard}
          >
            {">>"}
          </button>
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-400 transition duration-300 ease-in-out"
            onClick={answerCorrect}
          >
            ./
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Results</h1>
        <p className="text-2xl text-black mb-2">Total Correct: {correct.length}</p>
        <p className="text-2xl text-black mb-2">Total Incorrect: {wrong.length}</p>
        <p className="text-2xl text-black mb-4">Final Score: {(correct.length / total) * 100}%</p>
        <div className="flex space-x-4">
            <a className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-400 transition duration-300 ease-in-out" href="/learn">
              Back to Learn
            </a>
            <a className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out" href={`/ViewDeck/${deck.id}`}>
              Retry
            </a>
        </div>
      </div>
    );
  }
}
