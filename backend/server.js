
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

import Race from './models/race';
import StartingGrid from './models/starting-grid';
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

router.get('/raceResults/:country_code', (req, res) => {
  RaceResult.find({ "country_code": req.params.country_code }, (err, raceResults) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: raceResults });
  });
});

router.get('/raceResults/:country_code/podium', (req, res) => {
  RaceResult.find({ "country_code": req.params.country_code }, (err, raceResults) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: raceResults });
  }).limit(3);
});

router.get('/raceResults/:country_code/:limit', (req, res) => {
  RaceResult.find({ "country_code": req.params.country_code }, (err, raceResults) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: raceResults });
  }).limit(parseInt(req.params.limit));
});

router.get('/startingGrid', (req, res) => {
  StartingGrid.find((err, startingGrid) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: startingGrid });
  });
});

router.get('/startingGrid/:country_code', (req, res) => {
  StartingGrid.find({ "country_code": req.params.country_code }, (err, startingGrid) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: startingGrid });
  });
});

router.get('/startingGrid/:country_code/frontRow', (req, res) => {
  StartingGrid.find({ "country_code": req.params.country_code }, (err, startingGrid) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: startingGrid });
  }).limit(2);
});

router.get('/startingGrid/:country_code/:limit', (req, res) => {
  StartingGrid.find({ "country_code": req.params.country_code }, (err, startingGrid) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: startingGrid });
  }).limit(parseInt(req.params.limit));
});

router.get('/driverPoints/:driver_code', (req, res) => {
  RaceResult.find({ "driver_code": req.params.driver_code }, { "points": 1 }, (err, driverPoints) => {
    if (err) return res.json({ success: false, error: err });
    let pointsSum = 0;
    for (let i = 0; i < driverPoints.length; i++) pointsSum += parseInt(driverPoints[i].points);
    return res.json({ success: true, data: pointsSum });
  });
});

router.get('/driverPoints/:driver_code/:country_code', (req, res) => {
  RaceResult.find({ "driver_code": req.params.driver_code }, { "country_code": 1, "points": 1 }, (err, driverPoints) => {
    if (err) return res.json({ success: false, error: err });
    let pointsSum = 0;
    let i = 0;
    for (; i < driverPoints.length && driverPoints[i].country_code != req.params.country_code; i++) {
      pointsSum += parseInt(driverPoints[i].points);
    }
    pointsSum += parseInt(driverPoints[i].points);
    return res.json({ success: true, data: pointsSum });
  });
});

router.get('/points/leaders/:country_code', (req, res) => {
  // get list of drivers
  RaceResult.find().distinct("driver_code", async (err, driverList) => {
    if (err) return res.json({ success: false, error: err });
    // Fetch drivers
    let pointsList = [];
    for (let i = 0; i < driverList.length; i++) {
      const j = await fetch('http://localhost:3001/api/driverPoints/' + driverList[i] + '/' + req.params.country_code)
        .then(data => data.json());
        pointsList.push({ driver_code: driverList[i], points: j.data });
    }
    // Sort drivers
    pointsList = pointsList.sort((a, b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
    return res.json({ success: true, data: pointsList });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));