"use client";
import { useState } from "react";
import { getLanguage } from "./LanguageBar";
import { v4 } from "uuid";
import { uploadImage } from "../page";
import { insertDeck } from "/app/api/MongooseActions";

export let [cards, setCards] = "";

export default function CardList() {
  [cards, setCards] = useState([{ img1: null, img2: null }]);

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
          <span>Front Image: </span>
          <input
            type="file"
            id={`image1-${index}`}
            name={`image1-${index}`}
            accept=".jpg, .jpeg, .png"
            required
          />

          <span>Back Image: </span>
          <input
            type="file"
            id={`image2-${index}`}
            name={`image2-${index}`}
            accept=".jpg, .jpeg, .png"
            required
          />
          <button
            type="button"
            className="bg-red-500 px-4 py-2 hover:bg-red-300"
            onClick={() => deleteCard(index)}
          >
            Delete
          </button>
          <br></br>
        </div>
      ))}
      <br></br>
      <input
        type="submit"
        value="Create New Deck"
        className="w3-btn w3-black w3-opacity-min w3-margin-top w3-right-align"
        onClick={handleSubmitDeck}
      ></input>
    </>
  );
}

export function getCards() {
  return cards;
}

function handleSubmitDeck(e) {
  e.preventDefault();
  const deckName = document.querySelector('input[name="deckName"]').value;
  if (deckName === "" || getCards().length === 0) return;

  let deck = {
    id: v4(),
    title: deckName,
    cards: getCards(),
    language: getLanguage(),
  };

  compileSubmitDeck(deck);
}

function compileSubmitDeck(deck) {
  deck.cards.forEach((card, index) => {
    //Select images1/2 to upload to imgbb
    let image1 = document.getElementById(`image1-${index}`);
    let image2 = document.getElementById(`image2-${index}`);
    if (image1.files.length > 0 && image2.files.length > 0) {
      const reader1 = new FileReader();
      reader1.onload = async function () {
        const imageData1 = reader1.result.split(',')[1];
        let temp1 = await uploadImage(imageData1, index);
        card.img1 = temp1

        const reader2 = new FileReader();
        reader2.onload = async function () {
          const imageData2 = reader2.result.split(',')[1];
          let temp2 = await uploadImage(imageData2, index);
          card.img2 = temp2
        };

        // Read and process the second image
        reader2.readAsDataURL(image2.files[0]);
      };

      // Read and process the first image
      reader1.readAsDataURL(image1.files[0]);
    }

  });
  console.log(deck.cards)
  console.log(deck);
  insertDeck(deck);
}
