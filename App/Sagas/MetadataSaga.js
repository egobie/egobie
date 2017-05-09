import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as Action from '../Actions/MetadataAction';
import { getVehicleMakes, getVehicleModels, getDiscounts } from '../Requests/MetadataRequest';


function* getVehicleMakesTask() {
  try {
    const vehicleMakes = yield getVehicleMakes();
    yield put({
      type: Action.METADATA_GET_VEHICLE_MAKE_SUCCESS,
      vehicleMakes,
    });
  } catch (error) {
    yield({
      type: Action.METADATA_GET_VEHICLE_MAKE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: Action.METADATA_GET_VEHICLE_MAKE_FAIL,
      });
    }
  }
}

function* getVehicleModelsTask() {
  try {
    const vehicleModels = yield getVehicleModels();
    yield put({
      type: Action.METADATA_GET_VEHICLE_MODEL_SUCCESS,
      vehicleModels,
    });
  } catch (error) {
    yield put({
      type: Action.METADATA_GET_VEHICLE_MODEL_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: Action.METADATA_GET_VEHICLE_MODEL_FAIL,
      });
    }
  }
}

function* getDiscountsTask() {
  try {
    const discounts = yield getDiscounts();
    yield put({
      type: Action.METADATA_GET_DISCOUNT_SUCCESS,
      discounts,
    });
  } catch (error) {
    yield put({
      type: Action.METADATA_GET_DISCOUNT_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: Action.METADATA_GET_DISCOUNT_FAIL,
      });
    }
  }
}

export default function* metadataSaga() {
  yield takeLatest(Action.METADATA_GET_VEHICLE_MAKE, getVehicleMakesTask);
  yield takeLatest(Action.METADATA_GET_VEHICLE_MODEL, getVehicleModelsTask);
  yield takeLatest(Action.METADATA_GET_DISCOUNT, getDiscountsTask);
};