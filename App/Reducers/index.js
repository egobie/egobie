import { combineReducers } from 'redux';

import user from './UserReducer';
import metadata from './MetadataReducer';
import location from './LocationReducer';
import workflow from './WorkflowReducer';
import calendar from './CalendarReducer';
import payment from './PaymentReducer';
import message from './MessageReducer';
import picker from './PickerReducer';
import service from './ServiceReducer';
import vehicle from './VehicleReducer';
import resetPassword from './ResetPasswordReducer';
import confirm from './ConfirmReducer';


export default combineReducers({
  user,
  location,
  workflow,
  calendar,
  payment,
  metadata,
  message,
  picker,
  service,
  vehicle,
  resetPassword,
  confirm,
});
