import { combineReducers } from 'redux';

import user from './UserReducer';
import service from './ServiceReducer';

export default combineReducers({
  user,
  service,
});
