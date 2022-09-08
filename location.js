'use strict';

const axios = require('axios');

// sample url used to gather initial Mapbox data = `https://api.mapbox.com/geocoding/v5/mapbox.places/seattle.json?types=place&access_token={process.env.MAPBOX_API_PUBLIC_KEY}`

  
async function getMapbox(cityName, userEmail, notes) {
  const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  const searchType = '.json?types=place&access_token=';
  let searchQueryName = cityName;
  const url = `${baseURL}${searchQueryName}${searchType}${process.env.MAPBOX_API_PUBLIC_KEY}`;

  let axResponse = await axios.get(url);
  console.log(url);


  let id = axResponse.data.features[0].id;
  let longitude = axResponse.data.features[0].geometry.coordinates[0];
  let latitude = axResponse.data.features[0].geometry.coordinates[1];
  let city = axResponse.data.features[0].text;
  let state = '';
  axResponse.data.features[0].context.forEach((val) => {
    if(/(region).[0-9]+/.test(val.id) === true){
      state = val.text;
    }
  });
  
  let country = '';
  let shortCode = '';
  axResponse.data.features[0].context.forEach((val) => {
    if(/(country).[0-9]+/.test(val.id) === true){
      country = val.text;
      console.log('=====================');
      console.log(val.text);
      var index = axResponse.data.features[0].context.findIndex(p => p.id === val.id);
      console.log('Index of country: ', index);
      shortCode = axResponse.data.features[0].context[index].short_code;
      console.log('________________________');
      console.log(country);
    }
  })

  const mapboxObj = {
    id: id,
    longitude: longitude,
    latitude: latitude,
    city: city,
    state: state,
    country: country,
    shortCode: shortCode,
    email: userEmail,
    notes: notes
  };

  return getRestCountries(mapboxObj);
}


// sample url used to gather initial RestCountries data = 'https://restcountries.com/v2/name/malta';
// https://restcountries.com/v2/name/MT?fullText=true

async function getRestCountries(mapboxObj) {
  
  const baseURL = `https://restcountries.com/v2/name/${mapboxObj.shortCode}?fullText=true`

  let id = mapboxObj.id;
  let longitude = mapboxObj.longitude;
  let latitude = mapboxObj.latitude;
  let city = mapboxObj.city;
  let state = mapboxObj.state;
  let country = mapboxObj.country;
  let email = mapboxObj.email;
  let notes = mapboxObj.notes;
  
  let axResponse = await axios.get(baseURL);
  
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
    email: email,
    notes: notes
  };

  console.log(placeObj);
  return placeObj;
}


module.exports = getMapbox;
