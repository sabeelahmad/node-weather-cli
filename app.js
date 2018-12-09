const yargs = require('yargs');
/* Loading geocode module */
const geocode = require('./geocode/geocode');
/* Loading weather module */
const weather = require('./weather/weather');

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

/* api request to google geolocation api */
geocode.geocodeAddress(address, (errorMessage, results) => {
  /* Callback to geocodeAddress function, which executes after
  request to api is made */
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    /* Chaining callback to weather api after lat, lng received */
    /* Request to weather api to fetch temperature data
    for the provided address, this is accomplished by first fetching
    the lat, lng valus using google geocode apim the call to the method
    is also provided with a callback that manipulates the received results and
    handles errors (if any) as well. */
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It is ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});


