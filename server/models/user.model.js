import mongoose from "mongoose";

//userId = ObjectID!
const userSchema = mongoose.Schema({
    firstName:{type:String, required:[true, "Please provide a Firstname"], trim:true},
    lastName:{type:String, required:[true, "Please provide a Lastname"], trim:true},
    eMail:{type:String,required:[true, "Please provide a E-Mail"], trim:true},
    password:{type:String, required:[true, "Please provide a Password"]},
    sprachen:[{type:String}],
    kurzprofil:{type:String},
    beratungsschwerpunkte:[{type:String}],
    projektRollen:[{type:String}],
    skills:[{type:mongoose.Types.ObjectId, ref:"Skill"}],
    career:[{type:mongoose.Types.ObjectId, ref:"Career"}],
    education:[{type:mongoose.Types.ObjectId, ref:"Education"}],
    projects:[{type: mongoose.Types.ObjectId, ref:"Project"}],
    shortProfile:{type:String, trim:true},
    isAdmin:{type:Boolean},
    keycloakID:{type: String}
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema);