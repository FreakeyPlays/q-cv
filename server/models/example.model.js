import mongoose from "mongoose";

const exampleSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
})

export default mongoose.model("Example", exampleSchema)