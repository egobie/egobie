import * as ApiKey from '../Libs/ApiKey';


const GOOGLE_GEOCIDE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${ApiKey.GOOGLE_PLACE_KEY}`;

export const getCurrentLocation = (latitude, longitude) => {
  return fetch(`${GOOGLE_GEOCIDE_URL}&latlng=${latitude},${longitude}`, {
    method: 'GET',
  });
};