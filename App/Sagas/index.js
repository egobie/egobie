import { combineReducers } from 'redux';

import user from './UserSaga';
import resident from './ResidentSaga';

export default combineReducers({
  user,
  resident,
});
