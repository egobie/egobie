import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as ServiceAction from '../Actions/ServiceAction';
import { getAllServices, getAllReservations, reserveService, cancelReservation } from '../Requests/ServiceRequest';


function* getAllServicesTask() {
  try {
    const services = yield getAllServices()
    yield put({
      type: ServiceAction.SERVICE_GET_ALL_SUCCESS,
      services,
    });
  } catch (error) {
    yield put({
      type: ServiceAction.SERVICE_GET_ALL_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_FAIL,
      });
    }
  }
}

function* getAllReservationsTask() {
  try {
    const reservations = yield getAllReservations();
    yield put({
      type: ServiceAction.SERVICE_GET_ALL_RESERVATION_SUCCESS,
      reservations,
    });
  } catch (error) {
    yield put({
      type: ServiceAction.SERVICE_GET_ALL_RESERVATION_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ServiceAction.SERVICE_CANCEL_RESERVATION_FAIL,
      });
    }
  }
}

function* reserveServiceTask(action) {
  try {
    yield reserveService(action.carId, action.note, action.opening, action.services);
    yield put({
      type: ServiceAction.SERVICE_RESERVE_SUCCESS,
    });
    yield put({
      type: ServiceAction.SERVICE_GET_ALL_RESERVATION,
    });
  } catch (error) {
    yield put({
      type: ServiceAction.SERVICE_RESERVE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ServiceAction.SERVICE_RESERVE_FAIL,
      });
    }
  }
}

function* cancelReservationTask(action) {
  try {
    yield cancelReservation(action.id);
    yield put({
      type: ServiceAction.SERVICE_CANCEL_RESERVATION_SUCCESS,
    });
    yield put({
      type: ServiceAction.SERVICE_GET_ALL_RESERVATION,
    });
  } catch (error) {
    yield put({
      type: ServiceAction.SERVICE_CANCEL_RESERVATION_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ServiceAction.SERVICE_CANCEL_RESERVATION_FAIL,
      });
    }
  }
}

export default function* serviceSaga() {
  yield takeLatest(ServiceAction.SERVICE_GET_ALL, getAllServicesTask);
  yield takeLatest(ServiceAction.SERVICE_RESERVE, reserveServiceTask);
  yield takeLatest(ServiceAction.SERVICE_CANCEL_RESERVATION, cancelReservationTask);
}