import { put, cancelled, takeLatest } from 'redux-saga/effects';

import * as ResetPasswordAction from '../Actions/ResetPasswordAction';
import * as ErrorAction from '../Actions/ErrorAction';
import { validateEmail, validateToken, resendToken, newPassword } from '../Requests/ResetPasswordRequest';


function* validateEmailTask(action) {
  try {
    const resp = yield validateEmail(action.email);

    if (resp.status === 200) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_EMAIL_SUCCESS,
        userId: resp.userId,
      });
    } else {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_EMAIL_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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

    if (resp.status === 200) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_TOKEN_SUCCESS,
      });
    } else {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_VALIDATE_TOKEN_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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

    if (resp.status === 200) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_RESEND_SUCCESS,
      });
    } else {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_RESEND_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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

    if (resp.status === 200) {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_NEW_PASSWORD_SUCCESS,
      });
    } else {
      yield put({
        type: ResetPasswordAction.RESET_PASSWORD_NEW_PASSWORD_FAIL,
      });
      yield put({
        type: ErrorAction.ERROR_SHOW,
        error: resp.body,
      });
    }
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