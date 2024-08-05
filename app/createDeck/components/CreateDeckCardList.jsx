"use client";
import { useState } from "react";
import { getLanguage } from "./LanguageBar";
import { v4 } from "uuid";
import { uploadImage, getUserEmail } from "../../api/ServerCalls";
import { insertDeck } from "/app/api/MongooseActions";
import { redirect } from "next/dist/server/api-utils";

export let [cards, setCards] = "";
export let [loadingState, setLoadingState] = "";

export default function CardList() {
  [cards, setCards] = useState([{ img1: null, img2: null }]);
  [loadingState, setLoadingState] = useState("Create New Deck");

  function deleteCard(index) {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  }

  function handleAddCard() {
    let newCard = {
      img1: null,
      img2: null,
    };
    setCards([...cards, newCard]);
  }

  return (
    <>
      <br></br>
      <br></br>
      <button
        type="button"
        className="w3-btn w3-teal w3-large w3-round w3-margin-bottom"
        onClick={() => handleAddCard()}
      >
        Add Card
      </button>
      {cards.map((card, index) => (
        <div className="w3-row-padding" key={index}>
          <br></br>
          <div className="flex">
            <span className="px-3">Front Image: </span>
            <input
              type="file"
              id={`image1-${index}`}
              name={`image1-${index}`}
              accept=".jpg, .jpeg, .png"
              required
            />

            <span className="px-3">Back Text: </span>
            <input
              type="text"
              id={`text-${index}`}
              name={`text-${index}`}
              // accept=".jpg, .jpeg, .png"
              required
              className="rounded-sm w3-border border-black max-w-sm w3-input"
            />
            <button
              type="button"
              className="bg-red-500 px-4 py-2 hover:bg-red-300 mx-8"
              onClick={() => deleteCard(index)}
            >
              Delete
            </button>
          </div>

          <br></br>
        </div>
      ))}
      <br></br>
      <input
        type="submit"
        value={loadingState}
        className="w3-btn w3-black w3-opacity-min w3-margin-top w3-right-align"
        onClick={handleSubmitDeck}
      ></input>
    </>
  );
}

function handleSubmitDeck(e) {
  e.preventDefault();
  const deckName = document.querySelector('input[name="deckName"]').value;
  if (deckName === "" || cards.length === 0) return;

  let deck = {
    id: v4(),
    title: deckName,
    cards: cards,
    language: getLanguage(),
    user: null,
  };

  getUserEmail().then((res) => {
    deck.user = res;
    setLoadingState("Creating deck...");
    compileSubmitDeck(deck);
  });
}

function compileSubmitDeck(deck) {
  // Create a list of promises to track the async operations
  const promises = [];

  deck.cards.forEach((card, index) => {
    let image1 = document.getElementById(`image1-${index}`);
    let text = document.getElementById(`text-${index}`).value;

    if (image1.files.length > 0 && text) {
      const promise = new Promise((resolve) => {
        const reader1 = new FileReader();
        reader1.onload = async function () {
          const imageData1 = reader1.result.split(",")[1];
          let temp1 = await uploadImage(imageData1, index);
          card.img1 = temp1;

          resolve(); // Resolve this promise after the image is uploaded
        };

        // Read and process the first image
        reader1.readAsDataURL(image1.files[0]);
      });

      promises.push(promise);
      card.img2 = text;
      if(card.img2 == null || card.img1 == null){
        setLoadingState("Do not leave any fields empty!")
      }

    } else {
      return;
    }
  });

  //  create a promise chain
  async function chainPromises() {
    await Promise.all(promises); // Wait for all the image uploading promises to complete

    if(loadingState == "Do not leave any fields empty!") return;
    insertDeck(deck);
    setLoadingState("Deck successfully created!");
  }

  // Call the function to start the promise chain
  chainPromises();
}
