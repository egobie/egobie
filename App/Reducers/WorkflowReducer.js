import * as Action from '../Actions/WorkflowAction';


const workflow = {
  prev: [],
  name: Action.WORK_FLOW_START,
};

export default (state = workflow, action) => {
  let prev = [].concat(state.prev);
  prev.push(action.type);

  switch (action.type) {
    case Action.WORK_FLOW_LOCATION:
      return Object.assign({}, state, {
        prev,
        name: Action.WORK_FLOW_LOCATION,        
      });

    case Action.WORK_FLOW_ORDER:
      return Object.assign({}, state, {
        prev,
        name: Action.WORK_FLOW_ORDER,
      });

    case Action.WORK_FLOW_CALENDAR:
      return Object.assign({}, state, {
        prev,
        name: Action.WORK_FLOW_CALENDAR,
      });

    case Action.WORK_FLOW_BACK:
      return;

    default:
      return state;
  };
};
