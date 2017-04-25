import * as Action from '../Actions/ErrorAction';


const error = {
  message: '',
  show: false,
};

export default (state = error, action) => {
  switch(action.type) {
    case Action.ERROR_SHOW:
      return Object.assign({}, state, {
        message: action.error,
        show: true,
      });

    case Action.ERROR_HIDE:
      return Object.assign({}, state, {
        message: '',
        show: false,
      });

    default:
      return state;
  }
}