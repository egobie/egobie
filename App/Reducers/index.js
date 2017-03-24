import { combineReducers } from 'redux';

import user from './UserReducer';
import service from './ServiceReducer';
import location from './LocationReducer';

export default combineReducers({
  user,
  service,
  location,
});
