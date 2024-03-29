import mongoose from "mongoose";

const educationSchema = mongoose.Schema({
    title: { type: String, required: [true, "Please provide a Title"], trim: true },
    degree: { type: String, required: [true, "Please provide a Degree"], trim: true },
    fieldOfStudy: { type: String, trim: true },
    startDate: { type: Date, required: [true, "Please provide a Start Date"] },
    endDate: { type: Date, required: [true, "Please provide a End Date"] },
    assignedUser: { type: mongoose.Types.ObjectId, ref:"User", require: [true, "Please provide a assigned User"] }
}, {
    timestamps: true
});

export default mongoose.model('Education', educationSchema);