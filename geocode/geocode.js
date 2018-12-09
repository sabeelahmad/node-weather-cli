/* This module contains functionality related to geocode api */

/* Requesting api key from config file */
const APIKey = require('../config').apikey;

/* Requiring the request module, it helps to make api request */
const request = require('request');

var geocodeAddress = (address, callback) => {
  /* Encode the address in order to make it URL compatible */
  const encodedAddress = encodeURIComponent(address);

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
      callback('Unable to connect to Google GeoCoding API.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the provided address.');
    } else if (body.status === 'OK') {
      /* No potential error, hence undefined */
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports = {
  geocodeAddress
}