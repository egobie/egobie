import { call, put, cancelled, takeLatest } from 'redux-saga/effects';
import Reactotron from 'reactotron-react-native'
import * as Action from '../Actions/ServiceAction';
import { getAllServices } from '../Requests/ServiceRequest';


function* getAllServicesTask() {
  try {
    Reactotron.log('getAllServicesTask');
    const services = yield call(getAllServices)
    Reactotron.log(services);
    yield put({
      type: Action.SERVICE_GET_ALL_SUCCESS,
      services: services,
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
