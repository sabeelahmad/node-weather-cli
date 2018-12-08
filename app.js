/* Requiring the request module, it helps to make api request */
const request = require('request');
const yargs = require('yargs');
/* Requesting api key from config file */
const APIKey = require('./config.js').apikey;
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

/* Get user input of address for argv */
const address = argv.address;

/* Encode the address in order to make it URL compatible */
const encodedAddress = encodeURIComponent(address);


/* api request to google geolocation api using
request module */

request({
  /* This is the options object that holds properties
  of our request */
  url: `https://maps.google.com/maps/api/geocode/json?key=${APIKey}&address=${encodedAddress}`,
  json: true // Automatically parses body from json to js object
}, (error, response, body) => {
  /* This is the general schema of  the callback
  as mentioned in the request npm docs */
  /* Handling errors */
  if (error) {
    console.log('Unable to connect to Google GeoCoding API.');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('Unable to find the provided address.');
  } else if (body.status === 'OK') {
    /* No potential error */
    console.log(`Address: ${body.results[0].formatted_address}.`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }
});