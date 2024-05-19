const mongoose=require("mongoose");

const bookschema = new mongoose.Schema({
    title: String,
    author: String,
    language: String,
    publisher: String,
    publication_date: Date,
    ISBN:Number,
    coverpage:String,
    review:String,
    price:Number,
    pages:Number,
});

const Books = mongoose.model('Books', bookschema);
module.exports=Books;