import { combineReducers } from 'redux';

import user from './UserReducer';
import service from './ServiceReducer';
import location from './LocationReducer';
import workflow from './WorkflowReducer';


export default combineReducers({
  user,
  service,
  location,
  workflow,
});
