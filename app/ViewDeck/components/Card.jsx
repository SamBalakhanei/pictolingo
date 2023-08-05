'use client'

import { useState } from "react";
import Image from "next/image";


export default function Card(deck) {
  try{
    deck = deck.deck[0].deck
  } catch {
    console.log("null reading")
  }
  


  const [index, setIndex] = useState(0)
  const [image, setImage] = useState(deck.cards[index].img1);
  const [alt, setAlt] = useState("img1");
  const [flipped, setFlipped] = useState(false);
  

  const [wrong, setWrong] = useState([])
  const [correct, setCorrect] = useState([])
  const total = deck.cards.length

  function flipCard() {
    if (!flipped) {
      setImage(deck.cards[index].img2);
      setAlt("img2");
      setFlipped(true);
      // console.log("Card flipped to 2");
    } else {
      setFlipped(false);
      setImage(deck.cards[index].img1);
      setAlt("img1");
      // console.log("Card flipped to 1");
    }
  }

  function answerWrong(){
    setWrong([...wrong, deck.cards[index]])
    updateCard()

  }
  
  function skipCard(){
    deck.cards.push(deck.cards[index]);
    deck.cards.splice(index,1);
    setImage(deck.cards[index].img1)
  }

  function answerCorrect(){
    setCorrect([...correct, deck.cards[index]])
    updateCard()
  }

  function showResults(){ //how do i clear screen and render something new? do i just return ( <Results /> ) or something?
    console.log("Total Correct : " + correct.length)
    console.log("Total Incorrect: " + wrong.length)
    console.log("Final Score: " + correct/total)
  }

  function updateCard(){
    if(index === deck.cards.length-1){
      showResults()
    } else {
      setIndex(index+1);
      setImage(deck.cards[index].img1)
    }
  }

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
}
