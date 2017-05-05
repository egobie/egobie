import userSaga from './UserSaga';
import metadataSaga from './MetadataSaga';
import locationSaga from './LocationSaga';
import vehicleSaga from './VehicleSaga';

export default function* eGobieSaga() {
  yield [
    userSaga(),
    locationSaga(),
    metadataSaga(),
    vehicleSaga(),
  ];
}
