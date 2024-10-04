const mongoose=require('mongoose')
const mongo_url=process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
      console.log("Connected to mongoDB successfully");
    }).catch((err) => { console.log("Bad luck...Some error occured..."),err })