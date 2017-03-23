import { call, put, cancelled, takeLatest } from 'redux-saga/effects';

import * as Action from '../Actions/UserAction';


function* signInTask(action) {
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
      yield put({
        type: Action.USER_SIGN_IN_FAIL,
      });
    }
  }
}

function* signUpTask(action) {
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
      yield put({
        type: Action.USER_SIGN_UP_FAIL,
      });
    }
  }
}

export default function* userSaga() {
  yield takeLatest(Action.USER_SIGN_IN, signInTask);
  yield takeLatest(Action.USER_SIGN_UP, signUpTask);
};
