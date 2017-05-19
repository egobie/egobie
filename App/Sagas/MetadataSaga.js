import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as MetadataAction from '../Actions/MetadataAction';
import * as ErrorAction from '../Actions/ErrorAction';
import { getDiscounts } from '../Requests/MetadataRequest';


function* getDiscountsTask() {
  try {
    const resp = yield getDiscounts();

    if (resp.status === 200) {
      yield put({
        type: MetadataAction.METADATA_GET_DISCOUNT_SUCCESS,
        discounts: resp.body,
      });
    } else {
      yield put({
        type: MetadataAction.METADATA_GET_DISCOUNT_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
  } catch (error) {
    yield put({
      type: MetadataAction.METADATA_GET_DISCOUNT_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: MetadataAction.METADATA_GET_DISCOUNT_FAIL,
      });
    }
  }
}

export default function* metadataSaga() {
  yield takeLatest(MetadataAction.METADATA_GET_DISCOUNT, getDiscountsTask);
};