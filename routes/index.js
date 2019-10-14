require('dotenv').config();
const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/schedule', async function(req, res, next) {
  const calendarId = process.env.CALENDAR_ID
  const apiKey = process.env.API_KEY
  const maxResults = 7
  const timeMin = `${new Date().toISOString()}`;

  console.log(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&maxResults=${maxResults}&timeMin=${timeMin}&orderBy=startTime&singleEvents=true`)


  try {
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&maxResults=${maxResults}&timeMin=${timeMin}&orderBy=startTime&singleEvents=true`)
    const json = await response.json()
    res.status(200).send(json.items.map(event => ({title: event.summary, startDateTime: event.start.dateTime})))
  } catch(err) {
    console.log(err)
    res.status(500).send("something went wrong")
  }
})

module.exports = router;
