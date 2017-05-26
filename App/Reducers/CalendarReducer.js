import * as Action from '../Actions/CalendarAction';


const calendar = {
  opening: null,
  date: '',
  pickUpBy: 0,
};

export default (state = calendar, action) => {
  switch (action.type) {
    case Action.CALENDAR_SELECT_DATE:
      return Object.assign({}, state, {
        opening: action.opening,
        date: action.date,
        pickUpBy: action.pickUpBy,
      });

    case Action.CALENDAR_DESELECT:
      return Object.assign({}, state, {
        opening: null,
        date: '',
        pickUpBy: 0,
      });

    default:
      return state;
  }
};