import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as ResetPasswordAction from '../Actions/ResetPasswordAction';
import { validateEmail, validateToken, resendToken, newPassword } from '../Requests/ResetPasswordRequest';


function* validateEmailTask(action) {
  try {
    const resp = yield validateEmail(action.email);
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_EMAIL_SUCCESS,
      userId: resp.user_id,
      email: resp.email,
    });
  } catch (error) {
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_EMAIL_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_EMAIL_FAIL,
      });
    }
  }
};

function* validateTokenTask(action) {
  try {
    const resp = yield validateToken(action.id, action.token);
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_TOKEN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_TOKEN_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_TOKEN_FAIL,
      });
    }
  }
};

function* resendTokenTask(action) {
  try {
    const resp = yield resendToken(action.userId, action.email);
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_RESEND_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_RESEND_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_RESEND_FAIL,
      });
    }
  }
};

function* newPasswordTask(action) {
  try {
    const resp = yield newPassword(action.userId, action.token, action.password);
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_NEW_PASSWORD_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: ResetPasswordAction.RESET_PASSWORD_NEW_PASSWORD_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_NEW_PASSWORD_FAIL,
      });
    }
  }
}

export default function* resetPasswordSaga() {
  yield takeLatest(ResetPasswordAction.RESET_PASSWORD_VALIDATE_EMAIL, validateEmailTask);
  yield takeLatest(ResetPasswordAction.RESET_PASSWORD_VALIDATE_TOKEN, validateTokenTask);
  yield takeLatest(ResetPasswordAction.RESET_PASSWORD_NEW_PASSWORD, newPasswordTask);
  yield takeLatest(ResetPasswordAction.RESET_PASSWORD_RESEND, resendTokenTask);
};