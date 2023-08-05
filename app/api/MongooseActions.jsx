'use server'
const mongoose = require("mongoose");
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



try{
  var allDecks = require('./_decks')
} catch{}
var allDecks = mongoose.model("allDecks")



export async function insertDeck(deckAdd) {
  const newDeck = await allDecks.create({
    deck: deckAdd,
    language: deckAdd.language
  });
  console.log("Deck successfully added with id: " + newDeck.deck.id)
}

export async function getDecks(currLanguage){
    const decks = await allDecks.find({ language : currLanguage })

    return decks;
}

export async function getOneDeck(deckId){
  const deck = await allDecks.find({ 'deck.id': deckId })
  return deck;
}