import userSaga from './UserSaga';
import metadataSaga from './MetadataSaga';
import locationSaga from './LocationSaga';
import vehicleSaga from './VehicleSaga';
import serviceSaga from './ServiceSaga';
import workflowSaga from './WorkflowSaga';


export default function* eGobieSaga() {
  yield [
    userSaga(),
    locationSaga(),
    metadataSaga(),
    vehicleSaga(),
    serviceSaga(),
    workflowSaga(),
  ];
}
