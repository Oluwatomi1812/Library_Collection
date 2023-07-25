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
        required: true,
        min:0,
        max: 100
    }
})

export default model("Book", BookSchema)