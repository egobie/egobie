import * as Action from '../Actions/LocationAction';

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

export default (state = location, action) => {
  switch (action.type) {
    case Action.LOCATION_SELECT:
      return Object.assign({}, state, action.location);

    case Action.LOCATION_DESELECT:
      return Object.assign({}, state, location);

    default:
      return state;
  }
}