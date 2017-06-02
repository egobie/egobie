import { put, cancelled, takeLatest } from 'redux-saga/effects';
import Reactotron from 'reactotron-react-native';

import * as UserAction from '../Actions/UserAction';
import * as MessageAction from '../Actions/MessageAction';
import * as VehicleAction from '../Actions/VehicleAction';
import * as ServiceAction from '../Actions/ServiceAction';
import { signIn, signUp, updateUser } from '../Requests/UserRequest';


function* signInTask(action) {
  try {
    const resp = yield signIn(action.email, action.password);

    if (resp.status === 200) {
      yield put({
        type: UserAction.USER_SIGN_IN_SUCCESS,
        user: resp.body,
      });
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL,
        userId: resp.body.id,
      });
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_RESERVATION,
      });
    } else {
      yield put({
        type: UserAction.USER_SIGN_IN_FAIL,
      });
      yield put({
        type: MessageAction.MESSAGE_SHOW,
        message: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: UserAction.USER_SIGN_IN_ERROR,
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
    const resp = yield signUp(
      action.email, action.password, action.fullName, action.phoneNumber, null,
    );

    if (resp.status === 200) {
      yield put({
        type: UserAction.USER_SIGN_UP_SUCCESS,
        user: resp.body,
      });
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL,
        userId: resp.body.id,
      });
    } else {
      yield put({
        type: UserAction.USER_SIGN_UP_FAIL,
      });
      yield put({
        type: MessageAction.MESSAGE_SHOW,
        message: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: UserAction.USER_SIGN_UP_ERROR,
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

function* updateUserTask(action) {
  try {
    const resp = yield updateUser(
      action.firstName, action.lastName, action.email, action.phoneNumber,
    );

    if (resp.status === 200) {
      yield put({
        type: UserAction.USER_UPDATE_SUCCESS,
        user: resp.body,
      });
      yield put({
        type: MessageAction.MESSAGE_SHOW,
        message: 'User\'s profile successfully updated!',
        messageType: 'success',
      });
    } else {
      yield put({
        type: UserAction.USER_UPDATE_FAIL,
      });
      yield put({
        type: MessageAction.MESSAGE_SHOW,
        message: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: UserAction.USER_UPDATE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: UserAction.USER_UPDATE_FAIL,
      });
    }
  }
}

export default function* userSaga() {
  yield takeLatest(UserAction.USER_SIGN_IN, signInTask);
  yield takeLatest(UserAction.USER_SIGN_UP, signUpTask);
  yield takeLatest(UserAction.USER_UPDATE, updateUserTask);
};
