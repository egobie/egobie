import * as Action from '../Actions/CalendarAction';


const calendar = {
  date: '',
  range: '',
};

export default (state = calendar, action) => {
  switch (action.type) {
    case Action.CALENDAR_SELECT_DATE:
      return Object.assign({}, state, {
        date: action.date,
        range: '',
      });

    case Action.CALENDAR_SELECT_RANGE:
      return Object.assign({}, state, {
        range: action.range,
      });

    case Action.CALENDAR_DESELECT:
      return Object.assign({}, state, {
        date: '',
        range: '',
      });

    default:
      return state;
  }
};