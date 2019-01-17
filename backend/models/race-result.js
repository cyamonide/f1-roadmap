import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RaceResultSchema = new Schema({
	country: String,
	country_code: String,
	position: String,
	number: String,
	driver_first: String,
	driver_last: String,
	car: String,
	laps: String,
	time: String,
	points: String
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('RaceResult', RaceResultSchema, "race_results");