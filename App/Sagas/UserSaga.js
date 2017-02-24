import * as Action from '../Actions/UserAction';

const user = {
  signIn: false,
};

export default (state = user, action) => {
  switch (action.type) {
    case Action.USER_SIGN_IN:
      return Object.assign({}, state, {
        signIn: true,
      });
    case Action.USER_SIGN_OUT:
      return Object.assign({}, state, {
        signIn: false,
      })
    default:
      return state;
  }
};