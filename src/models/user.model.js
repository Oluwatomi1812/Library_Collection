import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstname : {
        type: String,
        required: true,
        min:3,
        max:70
    },
    lastname : {
        type: String,
        required: true,
        min:3,
        max:70
    },
    username : {
        type: String,
        required: true,
        unique: true,
        min:3,
        max:70
    },
    email : {
        type: String,
        validators: {
            match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please add a valid email string to the email path."]
          },
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        validators:{
            match: (/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{7,}$/)
        }
       
    }
})

export default model("User", userSchema)