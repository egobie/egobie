import userSaga from './UserSaga';
import metadataSaga from './MetadataSaga';
import locationSaga from './LocationSaga';


export default function* eGobieSaga() {
  yield [
    userSaga(),
    locationSaga(),
    metadataSaga(),
  ];
}
