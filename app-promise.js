/* This file duplicates the same functionality of app.js
but uses ES6 Promises to accomplish the same, and instead of
using the request npm module, the axios npm package is used
since it has inbuilt support for promises and hence doesn't
require promise wrapping for function calls */

/* Loading API keys */
const APIKey = require('./config').apikey; // Geocode API Key
const key = require('./config').forecastKey; // Darksky API Key

const yargs = require('yargs');

/* Configuring yargs
Since we only have one command, we simply configure using options
*/
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address of the location.',
      string: true // always parse as string
    }
  })
  .help()
  .alias('help', 'h') //alias for help
  .argv;

/* Requiring axios module */
const axios = require('axios');

/* Encoding user input address */
const encodedAddress = encodeURIComponent(argv.address);
/* Forming URL - geocode */
const geoCodeURL = `https://maps.google.com/maps/api/geocode/json?key=${APIKey}&address=${encodedAddress}`;
/* Making the request to geocode API using axios' get method, which returns a promise */
axios.get(geoCodeURL).then((response) => {
  /* Custom handling empty data in response - invalid address case */
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  /* Forming the weather URL using recieved data */
  var weatherURL = `https://api.darksky.net/forecast/${key}/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}`;
  console.log(response.data.results[0].formatted_address);
  /* Chaining the call to weather api using axios (Promise chaining) */
  return axios.get(weatherURL);
}).then((response) => {
  /* Handler for weather api resolved promise */
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's ${temperature}. But It feels like ${apparentTemperature}.`);
})
.catch((e) => {
  /* A general catch block, that will catch any errors if they happen */
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    /* To print our custom error */
    console.log(e.message);
  }
});

