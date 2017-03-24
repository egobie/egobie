import { put, takeLatest, cancelled } from 'redux-saga/effects';

import * as Action from '../Actions/LocationAction';
import { getCurrentLocation } from '../Requests/LocationRequest';


function* getCurrentLocationTask(action) {
  try {
    const detail = yield getCurrentLocation(action.latitude, action.longitude);
    Reactotron.log(detail);
    yield put({
      type: Action.LOCATION_GET_CURRENT_SUCCESS,
      detail
    });
  } catch (error) {
    yield put({
      type: Action.LOCATION_GET_CURRENT_ERROR,
      error
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: Action.LOCATION_GET_CURRENT_FAIL,
      });
    }
  }
}


export default function* locationSaga() {
  yield takeLatest(Action.LOCATION_GET_CURRENT, getCurrentLocationTask)
}