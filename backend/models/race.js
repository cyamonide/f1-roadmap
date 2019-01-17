import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
  name: String,
  track: String,
  country: String,
  country_ese: String,
  country_code: String,
  date_race: String,
  date_qualifying: String,
  date_fp1: String,
  date_fp2: String,
  date_fp3: String,
  start_date: String,
  end_date: String
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Race', RaceSchema, "races");