import * as Action from '../Actions/ResetPasswordAction';


const resetPassword = {
  userId: null,
  email: null,
  token: null,
  loading: false,
};

export default (state = resetPassword, action) => {
  switch (action.type) {
    case Action.RESET_PASSWORD_VALIDATE_EMAIL:
      return Object.assign({
        token: null,
        email: null,
        userId: null,
        loading: true,
      });

    case Action.RESET_PASSWORD_VALIDATE_EMAIL_SUCCESS:
      return Object.assign({
        userId: action.userId,
        email: action.email,
        loading: false,
      });

    case Action.RESET_PASSWORD_NEW_PASSWORD_FAIL:
    case Action.RESET_PASSWORD_NEW_PASSWORD_ERROR:
      return Object.assign({
        token: null,
        loading: false,
      });

    case Action.RESET_PASSWORD_VALIDATE_TOKEN:
      return Object.assign({
        loading: true,
      });

    case Action.RESET_PASSWORD_NEW_PASSWORD:
      return Object.assign({
        loading: true,
      });

    case Action.RESET_PASSWORD_VALIDATE_TOKEN_SUCCESS:
    case Action.RESET_PASSWORD_VALIDATE_TOKEN_FAIL:
    case Action.RESET_PASSWORD_VALIDATE_TOKEN_ERROR:
    case Action.RESET_PASSWORD_NEW_PASSWORD_ERROR:
    case Action.RESET_PASSWORD_NEW_PASSWORD_FAIL:
    case Action.RESET_PASSWORD_NEW_PASSWORD_SUCCESS:
      return Object.assign({
        loading: false,
      });

    default:
      return state;
  }
}