import { Schema, model, mongoose } from "mongoose";

const RentalSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    books:{
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