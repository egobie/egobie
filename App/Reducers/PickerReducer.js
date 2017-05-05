import * as PickerAction from '../Actions/PickerAction';

const picker = {
  options: [],
  selected: null,
};

export default (state = picker, action) => {
  switch (action.type) {
    case PickerAction.PICKER_SHOW:
      return Object.assign({}, state, {
        options: action.options ? action.options : [],
        selected: action.selected,
      });

    case PickerAction.PICKER_HIDE:
      return Object.assign({}, state, {
        options: [],
        selected: null,
      });

    case PickerAction.PICKER_PICK:
      return Object.assign({}, state, {
        selected: action.selected,
      });

    default:
      return state;
  }
};