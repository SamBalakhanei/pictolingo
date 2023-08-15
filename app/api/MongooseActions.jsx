'use server'
const mongoose = require("mongoose");
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.ATLAS_URL, {
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

export async function getDecks(currLanguage,email){
    const decks = await allDecks.find({ language : currLanguage, 'deck.user':email })

    return decks;
}

export async function getOneDeck(deckId){
  const deck = await allDecks.find({ 'deck.id': deckId })
  return deck;
}

export async function deleteDeck(deckId){
  await allDecks.deleteOne({ 'deck.id': deckId});
  return "Deck successfully removed";
}