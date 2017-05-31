import { put, call, cancelled, takeLatest } from 'redux-saga/effects';
import Reactotron from 'reactotron-react-native';
import * as ServiceAction from '../Actions/ServiceAction';
import * as ErrorAction from '../Actions/ErrorAction';
import {
  getAllServices, getAllReservations, reserveService, cancelReservation,
  getQueues, getOpenings, getPlaces,
} from '../Requests/ServiceRequest';


function* getAllServicesTask() {
  try {
    const resp = yield getAllServices()

    if (resp.status === 200) {
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_SUCCESS,
        services: resp.body,
      });
    } else {
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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
    const resp = yield getAllReservations();

    if (resp.status === 200) {
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_RESERVATION_SUCCESS,
        reservations: resp.body ? resp.body : [],
      });
    } else {
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_RESERVATION_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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

function* getOpeningsTask(action) {
  try {
    if (!action.id) {
      yield put({
        type: ServiceAction.SERVICE_GET_OPENING_FAIL,
      });
    } else {
      const resp = yield getOpenings(action.id, null, null);

      if (resp.status === 200) {
        yield put({
          type: ServiceAction.SERVICE_GET_OPENING_SUCCESS,
          openings: resp.body ? resp.body : [],
        });
      } else {
        yield put({
          type: ServiceAction.SERVICE_GET_OPENING_FAIL,
        });
        yield put({
          type: ErrorAction.ERROR_SHOW,
          error: resp.body,
        });
      }
    }
  } catch (error) {
    yield put({
      type: ServiceAction.SERVICE_GET_OPENING_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ServiceAction.SERVICE_GET_OPENING_FAIL,
      });
    }
  }
}

function* getQueuesTask(action) {
  try {
    const resp = yield getQueues(action.id, action.latitude, action.longitude);

    if (resp.status === 200) {
      yield put({
        type: ServiceAction.SERVICE_GET_QUEUE_SUCCESS,
        queue: resp.body,
      });
    } else {
      yield put({
        type: ServiceAction.SERVICE_GET_QUEUE_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: ServiceAction.SERVICE_GET_QUEUE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ServiceAction.SERVICE_GET_QUEUE_FAIL
      });
    }
  }
}

function* getPlacesTask() {
  try {
    const resp = yield getPlaces()

    if (resp.status === 200) {
      yield put({
        type: ServiceAction.SERVICE_GET_PLACE_SUCCESS,
        places: resp.body,
      });
    } else {
      yield put({
        type: ServiceAction.SERVICE_GET_PLACE_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: ServiceAction.SERVICE_GET_PLACE_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ServiceAction.SERVICE_GET_PLACE_FAIL,
      });
    }
  }
}

function* reserveServiceTask(action) {
  try {
    const resp = yield reserveService(
      action.carId, action.note, action.placeId, action.opening,
      action.pickUpBy, action.services, [],
    );

    if (resp.status === 200) {
      yield put({
        type: ServiceAction.SERVICE_RESERVE_SUCCESS,
      });
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_RESERVATION,
      });
      yield call(action.callback);
    } else {
      yield put({
        type: ServiceAction.SERVICE_RESERVE_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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
    const resp = yield cancelReservation(action.id);

    if (resp.status === 200) {
      yield put({
        type: ServiceAction.SERVICE_CANCEL_RESERVATION_SUCCESS,
      });
      yield put({
        type: ServiceAction.SERVICE_GET_ALL_RESERVATION,
      });
    } else {
      yield put({
        type: ServiceAction.SERVICE_CANCEL_RESERVATION_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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
  yield takeLatest(ServiceAction.SERVICE_GET_ALL_RESERVATION, getAllReservationsTask);
  yield takeLatest(ServiceAction.SERVICE_GET_PLACE, getPlacesTask);
  yield takeLatest(ServiceAction.SERVICE_GET_QUEUE, getQueuesTask);
  yield takeLatest(ServiceAction.SERVICE_GET_OPENING, getOpeningsTask);
  yield takeLatest(ServiceAction.SERVICE_RESERVE, reserveServiceTask);
  yield takeLatest(ServiceAction.SERVICE_CANCEL_RESERVATION, cancelReservationTask);
}
