import { combineReducers } from 'redux';

import user from './UserReducer';
import metadata from './MetadataReducer';
import service from './ServiceReducer';
import location from './LocationReducer';
import workflow from './WorkflowReducer';
import calendar from './CalendarReducer';
import payment from './PaymentReducer';


export default combineReducers({
  user,
  service,
  location,
  workflow,
  calendar,
  payment,
  metadata,
});
