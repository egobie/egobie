import { call, put, cancelled, takeLatest } from 'redux-saga/effects';
import Reactotron from 'reactotron-react-native';
import * as Action from '../Actions/ServiceAction';
import { getAllServices } from '../Requests/ServiceRequest';


function* getAllServicesTask() {
  try {
    const services = yield call(getAllServices)
    yield put({
      type: Action.SERVICE_GET_ALL_SUCCESS,
      services: services,
    });
  } catch (error) {
    Reactotron.log(error);
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
