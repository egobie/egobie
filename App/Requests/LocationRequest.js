import * as ApiKey from '../Libs/ApiKey';


const GOOGLE_GEOCODE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${ApiKey.GOOGLE_PLACE_KEY}`;

export const getCurrentLocation = (latitude, longitude) => {
  return fetch(`${GOOGLE_GEOCODE_URL}&latlng=${latitude},${longitude}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  })
  .then(resp => {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      let error = new Error(resp.statusText);
      error.response = resp;
      throw error;
    }
  })
  .then(resp => resp.json());
};