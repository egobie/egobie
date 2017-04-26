import { combineReducers } from 'redux';

import user from './UserReducer';
import service from './ServiceReducer';
import location from './LocationReducer';
import workflow from './WorkflowReducer';
import calendar from './CalendarReducer';


export default combineReducers({
  user,
  service,
  location,
  workflow,
  calendar,
});
