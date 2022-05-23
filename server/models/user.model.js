import mongoose from "mongoose";

//userId = ObjectID!
const userSchema = mongoose.Schema({
    firstName:{type:String, trim:true},
    lastName:{type:String, trim:true},
    eMail:{type:String, trim:true},
    password:{type:String},
    sprachen:[{type:String}],
    kurzprofil:{type:String},
    beratungsschwerpunkte:[{type:String}],
    projektRollen:[{type:String}],
    skills:[{type:mongoose.Types.ObjectId}],
    career:[{type:mongoose.Types.ObjectId}],
    education:[{type:mongoose.Types.ObjectId}],
    shortProfile:{type:String, trim:true},
    isAdmin:{type:Boolean}
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema);