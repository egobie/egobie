import { take, put, cancelled, takeLatest } from 'react-redux/effects';

import * as Action from '../Actions/UserAction';


function* signIn(action) {
  try {
    yield put({
      type: Action.USER_SIGN_IN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: Action.USER_SIGN_IN_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      // Cancel
    }
  }
}

function* signUp(action) {
  try {
    yield put({
      type: Action.USER_SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: Action.USER_SIGN_UP_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      // Cancel
    }
  }
}

export default function* userSaga() {
  yield takeLatest(Action.USER_SIGN_IN, signIn);
  yield takeLatest(Action.USER_SIGN_UP, signUp);
};
