import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as UserAction from '../Actions/UserAction';
import * as ErrorAction from '../Actions/ErrorAction';
import { signIn, signUp } from '../Requests/UserRequest';


function* signInTask(action) {
  try {
    const user = yield signIn(action.username, action.password);
    yield put({
      type: UserAction.USER_SIGN_IN_SUCCESS,
      user,
    });
  } catch (error) {
    yield put({
      type: UserAction.USER_SIGN_IN_ERROR,
    });
    yield put({
      type: ErrorAction.ERROR_SHOW,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: UserAction.USER_SIGN_IN_FAIL,
      });
    }
  }
}

function* signUpTask(action) {
  try {
    yield put({
      type: UserAction.USER_SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: UserAction.USER_SIGN_UP_ERROR,
    });
    yield put({
      type: ErrorAction.ERROR_SHOW,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: UserAction.USER_SIGN_UP_FAIL,
      });
    }
  }
}

export default function* userSaga() {
  yield takeLatest(UserAction.USER_SIGN_IN, signInTask);
  yield takeLatest(UserAction.USER_SIGN_UP, signUpTask);
};
