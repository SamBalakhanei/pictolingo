const mongoose = require("mongoose")

let check = false;

if(check === false){
    const DecksSchema = new mongoose.Schema({
    deck: Object,
    language: String
})
    module.exports = mongoose.model("allDecks", DecksSchema)
    check = true;
}

