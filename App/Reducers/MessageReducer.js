import * as Action from '../Actions/MessageAction';

const message = {
  context: null,
  type: null,
};

export default (state = message, action) => {
  switch (action.type) {
    case Action.MESSAGE_SHOW:
      return Object.assign({}, state, {
        context: action.message,
        type: action.messageType,
      });

    case Action.MESSAGE_HIDE:
      return Object.assign({}, state, {
        context: null,
      });

    default:
      return state;
  }
};