import mongoose from "mongoose";

const educationSchema = mongoose.Schema({
    title: { type: String, required: [true, "Please provide a Title"], trim: true },
    degree: { type: String, required: [true, "Please provide a Degree"], trim: true },
    fieldOfStudy: { type: String, required: [true, "Please provide a Field of Study"], trim: true },
    startDate: { type: String, required: [true, "Please provide a Start Date"], trim: true },
    endDate: { type: String, required: [true, "Please provide a End Date"], trim: true }
}, {
    timestamps: true
});

export default mongoose.model('Education', educationSchema);