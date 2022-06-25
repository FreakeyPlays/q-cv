import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: { type: String, required: [true, "Please provide a Project Title"], trim: true },
    customer: { type: String, required: [true, "Please provide a Project Customer"], trim: true },
    industry: { type: String, required: [true, "Please provide a Project Industry"], trim: true },
    country: { type: String, required: [true, "Please provide a Project Country"], trim: true },
    position: { type: String, required: [true, "Please provide a Project Position"], trim: true },
    startDate: { type: Date, required: [true, "Please provide a Project Starting Date"] },
    endDate: { type: Date, required: [true, "Please provide a Project Starting Date"] },
    description: { type: String, required: [true, "Please provide a Project Description"] },
    activities: [{ type: String }],
    environment: { type: String, trim: true},
    location: { type: String, trim: true },
    teamSize: { type: String },
    assignedUser: { type: mongoose.Types.ObjectId, ref:"User", require: [true, "Please provide a assigned User"] }
}, {
    timestamps: true
});

export default mongoose.model('Project', projectSchema);