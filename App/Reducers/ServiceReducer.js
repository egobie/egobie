import * as Action from '../Actions/ServiceAction';


const service = {
  all: [],
  selected: [],
  detail: null,
};

export default (state = service, action) => {
  switch (action.type) {
    case Action.SERVICE_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        all: action.services,
      });

    case Action.SERVICE_SHOW:
      let service = state.all.find((service) => {
        return service.id === action.id;
      });

    case Action.SERVICE_HIDE:
      return Object.assign({}, state, {
        detail: null,
      });

    case Action.SERVICE_SELECT:
      let selected1 = [].concat(state.selected);
      let find1 = state.all.find((service) => {
        return service.id === action.id;
      });

      if (find1) {
        selected1.push(find1);
      }

      return Object.assign({}, state, {
        selected: selected1,
      });

    case Action.SERVICE_DESELECT:
      let selected2 = [].concat(state.selected);
      let index = selected2.findIndex((service) => {
        return service.id === action.id;
      });

      if (index >= 0) {
        selected2.splice(index, 1);
      }

      return Object.assign({}, state, {
        selected: selected2,
      });

    default:
      return state;
  }
};