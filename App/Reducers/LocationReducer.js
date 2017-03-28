import * as Action from '../Actions/LocationAction';
import Reactotron from 'reactotron-react-native';

const location = {
  address: '',
  formattedAddress: '',
  streetNumber: '',
  street: '',
  city: '',
  county: '',
  state: '',
  zipcode: '',
  latitude: '',
  longitude: '',
  utcOffset: '',
};

const serializeLocation = (result) => {
  /**
   * Place Details JSON: (The GooglePlacesAutocomplete returns `result`)
   *  https://developers.google.com/places/web-service/details#PlaceDetailsResponses
   **/
  let detail = result.results ? result.results : result;
  let addresComponents = detail.address_components;
  let location = {
    address: detail.name,
    formattedAddress: detail.formatted_address,
    latitude: detail.geometry.location.lat,
    longitude: detail.geometry.location.lng,
    utcOffset: detail.utc_offset ? detail.utc_offset : '',
    streetNumber: '',
    street: '',
    city: '',
    county: '',
    state: '',
    zipcode: '',
  };

  for (let component of addresComponents) {
    let types = component.types;
    let value = component.long_name;
    if (types) {
      if (types.includes('street_number')) {
        location.streetNumber = value;
      } else if (types.includes('route')) {
        location.street = value;
      } else if (types.includes('locality')) {
        location.city = value;
      } else if (types.includes('administrative_area_level_2')) {
        location.county = value;
      } else if (types.includes('administrative_area_level_1')) {
        location.state = component.short_name;
      } else if (types.includes('postal_code')) {
        location.zipcode = value;
      }
    }
  }

  location.address = location.address ? location.address : `${location.streetNumber} ${location.street}`;

  return location;
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