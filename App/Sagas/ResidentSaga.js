import * as Action from '../Actions/ResidentAction';
import * as Step from '../Constants/ResidentStep';


const resident = {
  step: Step.LOCATION,
};

export default (state = resident, action) => {
  switch (action.type) {
    case Action.RESIDENT_LOCATION:
      return Object.assign({}, resident, {
        step: Step.LOCATION,
      });
    case Action.RESIDENT_SERVICE:
      return Object.assign({}, resident, {
        step: Step.SERVICE,
      });
    case Action.RESIDENT_PAYMENT:
      return Object.assign({}, resident, {
        step: Step.PAYMENT,
      });
    case Action.RESIDENT_CONFIRM:
      return Object.assign({}, resident, {
        step: Step.CONFIRM,
      });
    case Action.RESIDENT_PLACE_ORDER:
      return Object.assign({}, resident, {
        step: Step.PLACEORDER,
      });
    default:
      return state;
  }
};
