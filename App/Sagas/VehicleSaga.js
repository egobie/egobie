import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as VehicleAction from '../Actions/VehicleAction';
import * as ErrorAction from '../Actions/ErrorAction';
import {
  getAllVehicles, addVehicle, updateVehicle, deleteVehicle, getVehicleMakes, getVehicleModels,
} from '../Requests/VehicleRequest';


function* getVehicleMakesTask() {
  try {
    const makes = yield getVehicleMakes();
    yield put({
      type: VehicleAction.VEHICLE_GET_MAKE_SUCCESS,
      makes,
    });
  } catch (error) {
    yield({
      type: VehicleAction.VEHICLE_GET_MAKE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: VehicleAction.VEHICLE_GET_MAKE_FAIL,
      });
    }
  }
}

function* getVehicleModelsTask() {
  try {
    const models = yield getVehicleModels();
    yield put({
      type: VehicleAction.VEHICLE_GET_MODEL_SUCCESS,
      models,
    });
  } catch (error) {
    yield put({
      type: VehicleAction.VEHICLE_GET_MODEL_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: VehicleAction.VEHICLE_GET_MODEL_FAIL,
      });
    }
  }
}

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
  yield takeLatest(VehicleAction.VEHICLE_GET_MAKE, getVehicleMakesTask);
  yield takeLatest(VehicleAction.VEHICLE_GET_MODEL, getVehicleModelsTask);
  yield takeLatest(VehicleAction.VEHICLE_GET_ALL, getAllVehiclesTask);
  yield takeLatest(VehicleAction.VEHICLE_ADD, addVehicleTask);
  yield takeLatest(VehicleAction.VEHICLE_UPDATE, updateVehicleTask);
  yield takeLatest(VehicleAction.VEHICLE_DELETE, deleteVehicleTask);
}