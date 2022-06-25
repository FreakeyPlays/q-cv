import mongoose from "mongoose";

const careerSchema = mongoose.Schema({
    title: {type:String, required: [true, 'Title is missing']},
    company: { type: String, required: [true, 'Please provide a company name']},
    location: {type: String},
    position: {type: String},
    startDate: { type: Date, required: [true, "Please provide a Project Starting Date"] },
    endDate: { type: Date},
    jobDescription: {type:String},
    assignedUser: { type: mongoose.Types.ObjectId, ref:"User", require: [true, "Please provide a assigned User"] }
}, {
    timestamps: true
});

export default mongoose.model('Career', careerSchema);