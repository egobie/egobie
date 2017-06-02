import { put, takeLatest, cancelled } from 'redux-saga/effects';
import Reactotron from 'reactotron-react-native';

import * as Action from '../Actions/LocationAction';
import { getCurrentLocation } from '../Requests/LocationRequest';


function* getCurrentLocationTask(action) {
  try {
    const detail = yield getCurrentLocation(action.latitude, action.longitude);
    yield put({
      type: Action.LOCATION_GET_CURRENT_SUCCESS,
      detail: detail.results[0],
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