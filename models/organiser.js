const mongoose=require("mongoose");

const bookschema = new mongoose.Schema({
    title: String,
    author: String,
    language: String,
    publisher: String,
    publisher_city: String,
    publication_date: Date,
    ISBN:Number,
    coverpage:String,
});

const Books = mongoose.model('Books', bookschema);
module.exports=Books;