import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as VehicleAction from '../Actions/VehicleAction';
import * as ErrorAction from '../Actions/ErrorAction';
import { getAllVehicles, addVehicle, updateVehicle, deleteVehicle } from '../Requests/VehicleRequest';

function* getAllVehiclesTask(action) {
  try {
    const cars = yield getAllVehicles(action.userId);
    yield put({
      type: VehicleAction.VEHICLE_GET_ALL_SUCCESS,
      cars,
    });
  } catch (error) {
    yield put({
      type: VehicleAction.VEHICLE_GET_ALL_ERROR,
    });
    yield put({
      type: ErrorAction.ERROR_SHOW,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL_FAIL,
      });
    }
  }
}

function* addVehicleTask(action) {

}

function* updateVehicleTask(action) {

}

function* deleteVehicleTask(action) {

}

export default function* vehicleSaga() {
  yield takeLatest(VehicleAction.VEHICLE_GET_ALL, getAllVehiclesTask);
  yield takeLatest(VehicleAction.VEHICLE_ADD, addVehicleTask);
  yield takeLatest(VehicleAction.VEHICLE_UPDATE, updateVehicleTask);
  yield takeLatest(VehicleAction.VEHICLE_DELETE, deleteVehicleTask);
}