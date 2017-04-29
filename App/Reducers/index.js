import { combineReducers } from 'redux';

import user from './UserReducer';
import metadata from './MetadataReducer';
import location from './LocationReducer';
import workflow from './WorkflowReducer';
import calendar from './CalendarReducer';
import payment from './PaymentReducer';


export default combineReducers({
  user,
  location,
  workflow,
  calendar,
  payment,
  metadata,
});
