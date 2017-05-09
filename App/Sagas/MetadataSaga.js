import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as Action from '../Actions/MetadataAction';
import { getDiscounts } from '../Requests/MetadataRequest';


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
  yield takeLatest(Action.METADATA_GET_DISCOUNT, getDiscountsTask);
};