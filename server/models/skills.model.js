import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Please provide a skill "name"']},
}, {
    timestamps: true
});

export default mongoose.model('Skill', skillSchema);
//module.exports = mongoose.model('Skill', skillSchema);