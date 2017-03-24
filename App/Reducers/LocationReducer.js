import * as Action from '../Actions/LocationAction';
import Reactotron from 'reactotron-react-native';

const location = {
  address: '',
  formattedAddress: '',
  city: '',
  county: '',
  state: '',
  zipcode: '',
  latitude: '',
  longitude: '',
  utcOffset: '',
};

const serializeLocation = (result) => {
  Reactotron.log('result');
  Reactotron.log(result);
  /**
   * Place Details JSON: (The GooglePlacesAutocomplete returns `result`)
   *  https://developers.google.com/places/web-service/details#PlaceDetailsResponses
   **/
  let detail = result.results ? result.results : result;
  let addresDetails = detail.address_components;

  return {
    address: detail.name,
    formattedAddress: detail.formatted_address,
    city: addresDetails[2] ? addresDetails[2].long_name : '',
    county: addresDetails[3] ? addresDetails[3].short_name : '',
    state: addresDetails[4] ? addresDetails[4].short_name : '',
    zipcode: addresDetails[6] ? addresDetails[6].short_name : '',
    latitude: detail.geometry.location.lat,
    longitude: detail.geometry.location.lng,
    utcOffset: detail.utc_offset,
  };
};

export default (state = location, action) => {
  switch (action.type) {
    case Action.LOCATION_GET_CURRENT_SUCCESS:
    case Action.LOCATION_SELECT:
      return Object.assign({}, state, serializeLocation(action.detail));

    case Action.LOCATION_GET_CURRENT_FAIL:
    case Action.LOCATION_GET_CURRENT_ERROR:
    case Action.LOCATION_DESELECT:
      return Object.assign({}, state, location);

    default:
      return state;
  }
}