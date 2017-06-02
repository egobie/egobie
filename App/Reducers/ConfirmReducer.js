import * as Action from '../Actions/ConfirmAction';


const confirm = {
  visible: false,
  from: null,
  okConfig: null,
  cancelConfig: null,
  result: null,
};

export default (state = confirm, action) => {
  switch (action.type) {
    case Action.CONFIRM_SHOW:
      return Object.assign({}, state, {
        visible: true,
        from: action.from,
        okConfig: action.okConfig,
        cancelConfig: action.cancelConfig,
      });

    case Action.CONFIRM_OK:
      return Object.assign({}, state, {
        visible: false,
        result: 'OK',
      });
    
    case Action.CONFIRM_CANCEL:
      return Object.assign({}, state, {
        visible: false,
        result: 'CANCEL',
      });

    default:
      return state;
  }
}