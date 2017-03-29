import * as Action from '../Actions/WorkflowAction';


const workflow = {
  step: 1,
  name: Action.WORK_FLOW_START,
};

export default (state = workflow, action) => {
  switch (action.type) {
    case Action.WORK_FLOW_LOCATION:
      return Object.assign({}, state, {
        step: 1,
        name: Action.WORK_FLOW_LOCATION,        
      });

    case Action.WORK_FLOW_ORDER:
      return Object.assign({}, state, {
        step: 2,
        name: Action.WORK_FLOW_ORDER,
      });

    default:
      return state;
  };
};
