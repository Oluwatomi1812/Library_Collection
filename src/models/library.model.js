import joiObjectid from "joi-objectid";
import { Schema, model } from "mongoose";

const BookSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true, 
    },
    author:{
        type: String,
        required: true,
    },
    isbn:{
        type: String,
        required: true,
        unique: true, 
    },
    numberInStock:{
        type: Number,
        required: true
    }
})

export default model("Book", BookSchema)