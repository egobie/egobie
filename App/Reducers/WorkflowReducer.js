import Reactotron from 'reactotron-react-native';

import * as Action from '../Actions/WorkflowAction';


const workflow = {
  prev: [],
  name: Action.WORK_FLOW_START,
};

export default (state = workflow, action) => {
  let prev = [].concat(state.prev);

  switch (action.type) {
    case Action.WORK_FLOW_LOCATION:
    case Action.WORK_FLOW_ORDER:
    case Action.WORK_FLOW_CALENDAR:
    case Action.WORK_FLOW_SIGN:
    case Action.WORK_FLOW_SERVICE:
    case Action.WORK_FLOW_SCANNER:
    case Action.WORK_FLOW_LOADING:
      prev.push(state.name);
      return Object.assign({}, state, {
        prev,
        name: action.type,
      });

    case Action.WORK_FLOW_BACK:
      let back = prev.splice(-1, 1);
      let name = back.length === 1 ? back[0] : Action.WORK_FLOW_START;
      return Object.assign({}, state, {
        prev,
        name,
      });

    default:
      return state;
  };
};
