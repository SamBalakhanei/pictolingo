"use client";
import { useState } from "react";
import { getLanguage } from "./LanguageBar";
import { v4 } from "uuid";
import { uploadImage, getUserEmail} from "../../api/ServerCalls";
import { insertDeck } from "/app/api/MongooseActions";
import { useRouter } from "next/navigation";

export let [cards, setCards] = "";
export let [loadingState, setLoadingState] = "";
export let router = null;

export default function CardList() {
  [cards, setCards] = useState([{ img1: null, img2: null }]);
  [loadingState, setLoadingState] = useState("Create New Deck");
  router = useRouter();

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
    <div className="w-full max-w-3xl mx-auto mt-8">
      <button
        type="button"
        className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-full mb-4 hover:bg-teal-400 transition duration-300 ease-in-out"
        onClick={() => handleAddCard()}
      >
        Add Card
      </button>
      {cards.map((card, index) => (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4" key={index}>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 w-full md:w-auto">
              Front Image:
              <input
                type="file"
                id={`image1-${index}`}
                name={`image1-${index}`}
                accept=".jpg, .jpeg, .png"
                required
                className="ml-2 mt-2 md:mt-0"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2 w-full md:w-auto">
              Back Text:
              <input
                type="text"
                id={`text-${index}`}
                name={`text-${index}`}
                required
                className="rounded border border-gray-300 py-2 px-4 ml-2 mt-2 md:mt-0 md:w-64 w-full"
              />
            </label>
            <button
              type="button"
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-400 transition duration-300 ease-in-out"
              onClick={() => deleteCard(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <input
        type="submit"
        value={loadingState}
        className="bg-black text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out mt-4"
        onClick={handleSubmitDeck}
      />
    </div>
  );
}

function handleSubmitDeck(e) {
  e.preventDefault();
  setLoadingState("Creating deck..."); // Reset loading state to default at the beginning
  const deckName = document.querySelector('input[name="deckName"]').value;
  if (deckName === "" || cards.length === 0) {
    setLoadingState("Do not leave any fields empty!");
    return;
  }

  // Validate all cards before proceeding
  for (let i = 0; i < cards.length; i++) {
    const imageInput = document.getElementById(`image1-${i}`);
    const textInput = document.getElementById(`text-${i}`).value;

    if (!imageInput.files.length || !textInput) {
      setLoadingState("Do not leave any fields empty!");
      return;
    }
  }

  let deck = {
    id: v4(),
    title: deckName,
    cards: cards,
    language: getLanguage(),
    user: null,
  };

  getUserEmail().then((res) => {
    deck.user = res;
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
    }
  });

  // Create a promise chain
  async function chainPromises() {
    await Promise.all(promises); // Wait for all the image uploading promises to complete

    if (loadingState === "Do not leave any fields empty!") return;
    setLoadingState("Creating deck...");
    insertDeck(deck);
    setLoadingState("Deck successfully created!");
    router.push('/learn');
 

  }

  // Call the function to start the promise chain
  chainPromises();
}
