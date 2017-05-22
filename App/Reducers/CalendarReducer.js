import * as Action from '../Actions/CalendarAction';


const calendar = {
  date: '',
  pickUpBy: 0,
};

export default (state = calendar, action) => {
  switch (action.type) {
    case Action.CALENDAR_SELECT_DATE:
      return Object.assign({}, state, {
        date: action.date,
        pickUpBy: action.pickUpBy,
      });

    case Action.CALENDAR_DESELECT:
      return Object.assign({}, state, {
        date: '',
        pickUpBy: 0,
      });

    default:
      return state;
  }
};