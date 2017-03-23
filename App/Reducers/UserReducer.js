import * as Action from '../Actions/UserAction';


const user = {
  signIn: false,
};

export default (state = user, action) => {
  switch (action.type) {
    case Action.USER_SIGN_IN_SUCCESS:
    case Action.USER_SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        signIn: true,
      });

    case Action.USER_SIGN_IN_FAIL:
    case Action.USER_SIGN_IN_ERROR:
    case Action.USER_SIGN_UP_FAIL:
    case Action.USER_SIGN_UP_ERROR:
    case Action.USER_SIGN_OUT:
      return Object.assign({}, user);

    default:
      return state;
  }
};
