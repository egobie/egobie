import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as VehicleAction from '../Actions/VehicleAction';
import * as ErrorAction from '../Actions/ErrorAction';
import {
  getAllVehicles, addVehicle, updateVehicle, deleteVehicle,
  getVehicleMakes, getVehicleModels,
} from '../Requests/VehicleRequest';


function* getVehicleMakesTask() {
  try {
    const resp = yield getVehicleMakes();

    if (resp.status === 200) {
      yield put({
        type: VehicleAction.VEHICLE_GET_MAKE_SUCCESS,
        makes: resp.body,
      });
    } else {
      yield put({
        type: VehicleAction.VEHICLE_GET_MAKE_FAIL,
      });
    }
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
    const resp = yield getVehicleModels();

    if (resp.status === 200) {
      yield put({
        type: VehicleAction.VEHICLE_GET_MODEL_SUCCESS,
        models: resp.body,
      });
    } else {
      yield put({
        type: VehicleAction.VEHICLE_GET_MODEL_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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
    const resp = yield getAllVehicles(action.userId);

    if (resp.status === 200) {
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL_SUCCESS,
        cars: resp.body ? resp.body : [],
      });
    } else {
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL_FAIL,
      });
    }
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
  try {
    const resp = yield addVehicle(
      action.plate, action.state, action.year,
      action.color, action.make, action.model,
    );

    if (resp.status === 200) {
      yield put({
        type: VehicleAction.VEHICLE_ADD_SUCCESS,
        car: resp.body,
      });
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL,
      });
    } else {
      yield put({
        type: VehicleAction.VEHICLE_ADD_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: VehicleAction.VEHICLE_ADD_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: VehicleAction.VEHICLE_ADD_FAIL,
      });
    }
  }
}

function* updateVehicleTask(action) {
  try {
    const resp = yield updateVehicle(
      action.id, action.plate, action.state, action.year,
      action.color, action.make, action.model,
    );

    if (resp.status === 200) {
      yield put({
        type: VehicleAction.VEHICLE_UPDATE_SUCCESS,
      });
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL,
      });
    } else {
      yield put({
        type: VehicleAction.VEHICLE_UPDATE_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: VehicleAction.VEHICLE_UPDATE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: VehicleAction.VEHICLE_UPDATE_FAIL,
      });
    }
  }
}

function* deleteVehicleTask(action) {
  try {
    const resp = yield deleteVehicle(action.id);

    if (resp.status === 200) {
      yield put({
        type: VehicleAction.VEHICLE_DELETE_SUCCESS,
      });
      yield put({
        type: VehicleAction.VEHICLE_GET_ALL,
      });
    } else {
      yield put({
        type: VehicleAction.VEHICLE_DELETE_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: VehicleAction.VEHICLE_DELETE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: VehicleAction.VEHICLE_DELETE_FAIL,
      });
    }
  }
}

export default function* vehicleSaga() {
  yield takeLatest(VehicleAction.VEHICLE_GET_MAKE, getVehicleMakesTask);
  yield takeLatest(VehicleAction.VEHICLE_GET_MODEL, getVehicleModelsTask);
  yield takeLatest(VehicleAction.VEHICLE_GET_ALL, getAllVehiclesTask);
  yield takeLatest(VehicleAction.VEHICLE_ADD, addVehicleTask);
  yield takeLatest(VehicleAction.VEHICLE_UPDATE, updateVehicleTask);
  yield takeLatest(VehicleAction.VEHICLE_DELETE, deleteVehicleTask);
}