const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const path=require("path");
const bookinfo=require("./models/organiser");
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.listen(8080, (req,res) => {
    console.log("listening");
});

// edit book info 
app.get("/shelf/:id/edit",async (req,res) => {
  let {id}=req.params;
  let bookdata=await bookinfo.findById(id);
  res.render("update.ejs", {bookdata});
});

// edit book info 
app.put("/shelf/:id",async (req,res) => {
  let {id}=req.params;
  let bookdata=await bookinfo.findByIdAndUpdate(id, {...req.body.book});
  res.redirect(`/shelf/${id}`);
});

//create route (submit)
app.post("/shelf",async (req,res) =>{
  let bookadd=new bookinfo(req.body.book);
  await bookadd.save();
  res.redirect("/shelf");
});

//create route (input)
app.get("/shelf/new", (req,res) => {
  res.render("new.ejs");
});

//delete route
app.delete("/shelf/:id", async (req,res) => {
    let {id}=req.params;
    let bookdata=await bookinfo.findByIdAndDelete(id);
    console.log("deleted");
    res.redirect("/shelf");
});

// index route
app.get("/shelf", async (req,res) => {
  let bookdata=await bookinfo.find({});
  res.render("home.ejs",{bookdata});
});

// show route
app.get("/shelf/:id",async (req,res) => {
  let {id}=req.params;
  let bookdata=await bookinfo.findById(id);
  res.render("show.ejs", {bookdata});
});



main(console.log("DB Connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookshelf');
}