import * as Action from '../Actions/ErrorAction';

const error = {
  message: null,
};

export default (state = error, action) => {
  switch (action.type) {
    case Action.ERROR_SHOW:
      return Object.assign({}, state, {
        message: action.error,
      });

    case Action.ERROR_HIDE:
      return Object.assign({}, state, {
        message: null,
      });

    default:
      return state;
  }
};