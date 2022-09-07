'use strict';

const axios = require('axios');

// const mongoose = require('mongoose');



// const placeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/seattle.json?types=place&access_token={process.env.MAPBOX_API_PUBLIC_KEY}`

// function getLocationInfo(city, country) {
  
async function getMapbox() {
  const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  const searchType = '.json?types=place&access_token=';
  // the searchQueryName is currently hard-coded and needs to be formatted as 'request.query.city'
  let searchQueryName = 'seattle';
  const url = `${baseURL}${searchQueryName}${searchType}${process.env.MAPBOX_API_PUBLIC_KEY}`;

  let axResponse = await axios.get(url);

  // console.log(axResponse.data.features[0].text);
  // console.log(axResponse.data);
  
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
    country: country
  };
  getRestCountries(mapboxObj);
}
getMapbox();


// const nextPlaceUrl = 'https://restcountries.com/v2/name/malta';

async function getRestCountries(mapboxObj) {
  const baseURL = 'https://restcountries.com/v2/name/';
  // the searchQueryName is currently had-coded and needs to be formatted as 'request.query.country'
  let searchQueryName = 'malta';
  const url = `${baseURL}${searchQueryName}`;
  
  let axResponse = await axios.get(url);
  
  let id = mapboxObj.id;
  let longitude = mapboxObj.longitude;
  let latitude = mapboxObj.latitude;
  let city = mapboxObj.city;
  let state = mapboxObj.state;
  let country = mapboxObj.country;
  
  // let country = axResponse.data[0].name;
  // let latitude = axResponse.data[0].latlng[0];
  // let longitude = axResponse.data[0].latlng[1];
  let capital = axResponse.data[0].capital;
  let timezone = axResponse.data[0].timezones[0];
  let flag = axResponse.data[0].flag;
  let currencyName = axResponse.data[0].currencies[0].name;
  let currencySymbol = axResponse.data[0].currencies[0].symbol;
  let firstLanguage = axResponse.data[0].languages[0].name;
  let secondLanguage = axResponse.data[0].languages[1].name;
  
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
    secondLanguage: secondLanguage
  };
  // parseData(placeObj);
  // console.log(placeObj);
}


// }

// getLocationInfo();

// function parseData(placeObj) {
//   try {
//     let placeName = `${placeObj.city}, ${placeObj.country}`;
//     console.log(placeName);
//     const locationSummary = placeObj.map((locationData)=>{
//       return new Location(placeName, locationData);
//     });
//     return Promise.resolve(locationSummary);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }
// ______________________________________________________________
// let cache = require('./cache.js');
// const cacheInvalidationTime = 1000 * 60;

// class Location {
  //   constructor(placeName, locationData ) {
    //     this.city_name = cityName;
    //     this.valid_date = cityData.valid_date;
    //     this.low_temp = cityData.low_temp;
    //     this.high_temp = cityData.high_temp;
    //     this.description = cityData.weather.description;
    //   }
    
    
// function parseWeather(weatherData) {
//   try {
//     let cityName = weatherData.city_name;
//     const weatherSummaries = weatherData.data.map((cityData) => {
//       return new Weather(cityName, cityData);
//     });
//     return Promise.resolve(weatherSummaries);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

// class Weather {
//   constructor(cityName, cityData ) {
//     this.city_name = cityName;
//     this.valid_date = cityData.valid_date;
//     this.low_temp = cityData.low_temp;
//     this.high_temp = cityData.high_temp;
//     this.description = cityData.weather.description;
//   }



// try {

// } catch (error) {
//   next(error);
// }




// const key = 'weather' + searchQueryLat + searchQueryLon;

// if (cache[key] && (Date.now() - cache[key].timestamp < cacheInvalidationTime)) {
//   response.status(200).send(cache[key].data);
// } else {

//   let params = {
//     lat: searchQueryLat,
//     lon: searchQueryLon,
//     key: process.env.WEATHER_API_KEY
//   };

//     .then(weatherResults => parseWeather(weatherResults.data))
//     .then(parsedWeatherData => handleCaching(parsedWeatherData, key))
//     .then(parsedWeatherData => response.status(200).send(parsedWeatherData))
//     .catch(error => next(error));
// }

// function parseWeather(weatherData) {
//   try {
//     let cityName = weatherData.city_name;
//     const weatherSummaries = weatherData.data.map((cityData) => {
//       return new Weather(cityName, cityData);
//     });
//     return Promise.resolve(weatherSummaries);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

// function handleCaching(parsedData, key){
//   try{
//     cache[key] = {
//       data: parsedData,
//       timestamp: Date.now()
//     };
//     return Promise.resolve(cache[key].data);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

// class Weather {
//   constructor(cityName, cityData ) {
//     this.city_name = cityName;
//     this.valid_date = cityData.valid_date;
//     this.low_temp = cityData.low_temp;
//     this.high_temp = cityData.high_temp;
//     this.description = cityData.weather.description;
//   }
// }

module.exports = getMapbox;
module.exports = getRestCountries;

