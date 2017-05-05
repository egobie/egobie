import * as PickerAction from '../Actions/PickerAction';
import Reactotron from 'reactotron-react-native';


const picker = {
  options: [],
  target: null,
  vehicleMake: null,
  vehicleModel: null,
  vehicleColor: null,
  vehicleState: null,
  vehicleYear: null,
};

export default (state = picker, action) => {
  switch (action.type) {
    case PickerAction.PICKER_SHOW:
      return Object.assign({}, state, {
        options: action.options ? action.options : [],
        selected: action.selected,
        target: action.target,
      });

    case PickerAction.PICKER_HIDE:
      return Object.assign({}, state, {
        options: [],
        target: null,
      });

    case PickerAction.PICKER_PICK_VEHICLE_MAKE:
      return Object.assign({}, state, {
        vehicleMake: action.selected,
        vehicleModel: null,
      });

    case PickerAction.PICKER_PICK_VEHICLE_MODEL:
      return Object.assign({}, state, {
        vehicleModel: action.selected,
      });
    
    case PickerAction.PICKER_PICK_VEHICLE_STATE:
      return Object.assign({}, state, {
        vehicleState: action.selected,
      });

    case PickerAction.PICKER_PICK_VEHICLE_COLOR:
      return Object.assign({}, state, {
        vehicleColor: action.selected,
      });

    case PickerAction.PICKER_PICK_VEHICLE_YEAR:
      return Object.assign({}, state, {
        vehicleYear: action.selected,
      });

    case PickerAction.PICKER_PICK_RESET:
      return Object.assign({}, state, {
        options: [],
        target: null,
        vehicleMake: null,
        vehicleModel: null,
        vehicleColor: null,
        vehicleState: null,
        vehicleYear: null,
      });

    default:
      return state;
  }
};