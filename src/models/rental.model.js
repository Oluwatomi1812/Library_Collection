import { Schema, model, mongoose } from "mongoose";

const RentalSchema = new Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    Book:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    dateOut:{
        type: Date,
        default: Date.now()
    },
    dateReturned:{
        type: Date
    }
}, {timestamps: true}
)

export default model("Rental", RentalSchema)