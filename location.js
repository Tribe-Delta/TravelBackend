'use strict';

const axios = require('axios');

// sample url used to gather initial Mapbox data = `https://api.mapbox.com/geocoding/v5/mapbox.places/seattle.json?types=place&access_token={process.env.MAPBOX_API_PUBLIC_KEY}`

  
async function getMapbox(cityName, userEmail) {
  const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  const searchType = '.json?types=place&access_token=';
  // the searchQueryName is currently hard-coded and needs to be formatted as 'request.query.city'
  let searchQueryName = cityName;
  const url = `${baseURL}${searchQueryName}${searchType}${process.env.MAPBOX_API_PUBLIC_KEY}`;

  let axResponse = await axios.get(url);
  
  let id = axResponse.data.features[0].id;
  let longitude = axResponse.data.features[0].geometry.coordinates[0];
  let latitude = axResponse.data.features[0].geometry.coordinates[1];
  let city = axResponse.data.features[0].text;
  let state = axResponse.data.features[0].context[1].text;
  let country = axResponse.data.features[0].context[2].text;
  
  const mapboxObj = {
    id: id,
    longitude: longitude,
    latitude: latitude,
    city: city,
    state: state,
    country: country,
    email: userEmail
  };

  return getRestCountries(mapboxObj);
}


// sample url used to gather initial RestCountries data = 'https://restcountries.com/v2/name/malta';

async function getRestCountries(mapboxObj) {
  const baseURL = 'https://restcountries.com/v2/name/';
  // the searchQueryName is currently hard-coded and needs to be formatted as 'request.query.country'
  let id = mapboxObj.id;
  let longitude = mapboxObj.longitude;
  let latitude = mapboxObj.latitude;
  let city = mapboxObj.city;
  let state = mapboxObj.state;
  let country = mapboxObj.country;
  let email = mapboxObj.email;

  let searchQueryName = country;
  const url = `${baseURL}${searchQueryName}`;
  
  let axResponse = await axios.get(url);
  
  let capital = axResponse.data[0].capital;
  let timezone = axResponse.data[0].timezones[0];
  let flag = axResponse.data[0].flag;
  let currencyName = axResponse.data[0].currencies[0].name;
  let currencySymbol = axResponse.data[0].currencies[0].symbol;
  let firstLanguage = axResponse.data[0].languages[0].name;
  let secondLanguage = axResponse.data[0].languages[1]?.name;
  
  const placeObj = {
    id: id,
    longitude: longitude,
    latitude: latitude,
    city: city,
    state: state,
    country: country,
    countryCap: capital,
    timezone: timezone,
    flag: flag,
    currency: currencyName,
    currencySymbol: currencySymbol,
    firstLanguage: firstLanguage,
    secondLanguage: secondLanguage,
    email: email
  };

  console.log(placeObj);
  return placeObj;
}


module.exports = getMapbox;
