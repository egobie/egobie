import { put, canceled, takeLatest } from 'redux-saga/effects';

import * as Action from '../Actions/PaymentAction';
import { addPayment, deletePayment } from '../Requests/PaymentRequest';


function* addPaymentTask(action) {
  try {
    const payment = yield addPayment(
      action.accountName, action.accountNumber, action.accountType,
      action.cardType, action.code, action.expireMonth, action.expireYear
    );
    yield put({
      type: Action.PAYMENT_ADD_SUCCESS,
      payment,
    });
  } catch (error) {
    yield put({
      type: Action.PAYMENT_ADD_ERROR,
      error,
    });
  } finally {
    if (yield canceled()) {
      yield put({
        type: Action.PAYMENT_ADD_FAIL,
      });
    }
  }
}

function* deletePaymentTask(action) {
  try {
    yield deletePayment(action.id);
    yield put({
      type: Action.PAYMENT_DELETE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: Action.PAYMENT_DELETE_ERROR,
      error,
    });
  } finally {
    if (yield canceled()) {
      yield put({
        type: Action.PAYMENT_DELETE_FAIL,
      });
    }
  }
}



export default function* paymentSaga() {
  yield takeLatest(Action.PAYMENT_ADD, addPaymentTask);
  yield takeLatest(Action.PAYMENT_DELETE, deletePaymentTask);
}
