import * as Action from '../Actions/ResetPasswordAction';


const resetPassword = {
  userId: null,
  token: null,
  stepDone: 0,
  loading: false,
};

export default (state = resetPassword, action) => {
  switch (action.type) {
    case Action.RESET_PASSWORD_VALIDATE_EMAIL:
      return Object.assign({}, state, {
        loading: true,
      });

    case Action.RESET_PASSWORD_VALIDATE_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        userId: action.userId,
        stepDone: 1,
        loading: false,
      });

    case Action.RESET_PASSWORD_VALIDATE_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
        loading: true,
      });

    case Action.RESET_PASSWORD_VALIDATE_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        stepDone: 2,
        loading: false,
      });

    case Action.RESET_PASSWORD_RESEND_TOKEN:
      return Object.assign({}, state, {
        stepDone: 0,
      });

    case Action.RESET_PASSWORD_NEW_PASSWORD:
      return Object.assign({}, state, {
        loading: true,
      });

    case Action.RESET_PASSWORD_NEW_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        stepDone: 3,
        loading: false,
      });

    case Action.RESET_PASSWORD_VALIDATE_EMAIL_FAIL:
    case Action.RESET_PASSWORD_VALIDATE_EMAIL_ERROR:
    case Action.RESET_PASSWORD_VALIDATE_TOKEN_FAIL:
    case Action.RESET_PASSWORD_VALIDATE_TOKEN_ERROR:
    case Action.RESET_PASSWORD_NEW_PASSWORD_ERROR:
    case Action.RESET_PASSWORD_NEW_PASSWORD_FAIL:
      return Object.assign({}, state, {
        loading: false,
      });

    case Action.RESET_PASSWORD_RESET_ALL:
      return Object.assign({}, state, {
        userId: null,
        token: null,
        stepDone: 0,
        loading: false,
      });

    default:
      return state;
  }
}