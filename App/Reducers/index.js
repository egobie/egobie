import { combineReducers } from 'redux';

import user from './UserReducer';
import metadata from './MetadataReducer';
import location from './LocationReducer';
import workflow from './WorkflowReducer';
import calendar from './CalendarReducer';
import payment from './PaymentReducer';
import error from './ErrorReducer';
import picker from './PickerReducer';
import service from './ServiceReducer';
import vehicle from './VehicleReducer';
import resetPassword from './ResetPasswordReducer';


export default combineReducers({
  user,
  location,
  workflow,
  calendar,
  payment,
  metadata,
  error,
  picker,
  service,
  vehicle,
  resetPassword,
});
