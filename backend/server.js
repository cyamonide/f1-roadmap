
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import Race from './models/race';
import QualsResult from './models/quals-result';
import RaceResult from './models/race-result';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

// MongoDB config
const MongoURL = "mongodb://127.0.0.1:27017/f1_2018";
mongoose.connect(MongoURL, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Routes

router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/races', (req, res) => {
  Race.find((err, races) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: races });
  });
});

router.get('/raceResults', (req, res) => {
  RaceResult.find((err, raceResults) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: raceResults });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));