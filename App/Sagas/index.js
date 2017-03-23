import userSaga from './UserSaga';
import serviceSaga from './ServiceSaga';


export default function* eGobieSaga() {
  yield [
    userSaga(),
    serviceSaga(),
  ];
}
