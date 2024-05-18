const mongoose=require("mongoose");
const initdata=require("./data");
const booksmodel=require("../models/organiser");

main(console.log("DB Connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookshelf');
}

const initData= async () => {
    await booksmodel.deleteMany({});
    await booksmodel.insertMany(initdata.data);
    console.log("data inilialised");
}

initData();