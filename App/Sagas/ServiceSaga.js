import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as Action from '../Actions/ServiceAction';
import { getAllServices } from '../Requests/ServiceRequest';


function* getAllServicesTask() {
  try {
    const services = yield getAllServices()
    yield put({
      type: Action.SERVICE_GET_ALL_SUCCESS,
      services,
    });
  } catch (error) {
    yield put({
      type: Action.SERVICE_GET_ALL_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: Action.SERVICE_GET_ALL_FAIL,
      });
    }
  }
}

export default function* serviceSaga() {
  yield takeLatest(Action.SERVICE_GET_ALL, getAllServicesTask);
}