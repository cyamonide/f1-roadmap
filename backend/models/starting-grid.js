import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StartingGridSchema = new Schema({
	country: String,
	country_code: String,
	position: String,
	number: String,
	driver_first: String,
	driver_last: String,
	driver_code: String,
	car: String,
	time: String
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('StartingGrid', StartingGridSchema, "starting_grid");