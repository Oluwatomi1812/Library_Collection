import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import mongoose from "mongoose"
import {router} from "./src/routes/user.routers.js"

dotenv.config()
const app = express()
const port = process.env.PORT
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=> console.log("Database connection established")).catch(e=> console.log(e.message))
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to MongoDB!');
});


app.use(morgan("tiny"))
app.use(express.json())
app.use("/library", router)


app.listen(port, ()=>{
    console.log(`App is listening from port ${port}`)
})