import mongoose from "mongoose";

const cvSchema = mongoose.Schema({
	cvName: { type: String, required: [true, "Please provide a CV name"], trim: true },
	date: { type: Date },
	ownerId:{ type: mongoose.Types.ObjectId, ref:"User", require: [true, "Please provide an owner"] },
	userData: {
		name: { type: String, required: [true, "Please provide a name"], trim: true },
		languages: { type: String, required: [true, "Please provide languages"], trim: true },
		image: { data: Buffer, contentType: String },
		email: { type: String, required: [true, "Please provide an email"], trim: true },
		telephone: { type: String, trim: true },
		beraterQualifikation: { type: String, required: [true, "Please provide advisor qualifications"], trim: true },
		kurzprofil: { type: String, required: [true, "Please provide a short profile"], trim: true },
	},
	education: [{
		institution: { type: String, required: [true, "Please provide an institution"], trim: true },
		studyType: { type: String, required: [true, "Please provide a study type"], trim: true },
		subject: { type: String, required: [true, "Please provide a subject"], trim: true },
		startDate: { type: Date, required: [true, "Please provide a starting date"], trim: true },
		endDate: { type: Date, required: [true, "Please provide an ending date"], trim: true },
		grade: {type: String, required: [true, "Please provide a grade"], trim: true }
    }],
	career: [{
		company: { type: String, required: [true, "Please provide a company"], trim: true },
		city: { type: String, required: [true, "Please provide a city"], trim: true },
		country: { type: String, required: [true, "Please provide a country"], trim: true },
		position: { type: String, required: [true, "Please provide a position"], trim: true },
		startDate: { type: Date, required: [true, "Please provide a starting date"], trim: true },
		endDate: { type: Date, required: [true, "Please provide an ending date"], trim: true }
    }],
	skills: [{
		name: { type: String, required: [true, "Please provide a skill name"], trim: true}
    }],
	projects: [{
		title: { type: String, required: [true, "Please provide a Project Title"], trim: true },
    	customer: { type: String, required: [true, "Please provide a Project Customer"], trim: true },
		industry: { type: String, required: [true, "Please provide a Project Industry"], trim: true },
    	country: { type: String, required: [true, "Please provide a Project Country"], trim: true },
    	position: { type: String, required: [true, "Please provide a Project Position"], trim: true },
    	startDate: { type: Date, required: [true, "Please provide a Project Starting Date"] },
    	endDate: { type: Date, required: [true, "Please provide a Project Starting Date"] },
    	description: { type: String, required: [true, "Please provide a Project Description"] },
    	activities: { type: String, trim: true },
    	environment: { type: String, trim: true},
    	location: { type: String, required: [true, "Please provide a Project Location"], trim: true },
    	teamSize: { type: String, required: [true, "Please provide a Project Team Size"] }
    }]
});

export default mongoose.model('CV', cvSchema);