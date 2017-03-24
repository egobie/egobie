import userSaga from './UserSaga';
import serviceSaga from './ServiceSaga';
import locationSaga from './LocationSaga';


export default function* eGobieSaga() {
  yield [
    userSaga(),
    serviceSaga(),
    locationSaga(),
  ];
}
