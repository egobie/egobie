import * as Action from '../Actions/MetadataAction';
import Reactotron from 'reactotron-react-native';

const metadata = {
  vehicleMakes: {},
  vehicleModels: {},
  services: [],
  discounts: [],
  selectedServices: [],

  vehicleMake: null,
  vehicleModel: null,
  service: null,

};

const serializeVehicleMakes = (makes) => {
  let result = {};

  for (let make of makes) {
    result[make.id] = make.title;
  }

  return result;
};

const serializeVehicleModels = (models) => {
  let result = {};

  for (let model of models) {
    result[model.maker_id] = result[model.maker_id] ? result[model.maker_id] : [];
    result[model.maker_id].push({
      id: model.id,
      title: model.title,
    });
  }

  return result;
};

export default (state = metadata, action) => {
  switch (action.type) {
    case Action.METADATA_GET_VEHICLE_MAKE_SUCCESS:
      return Object.assign({}, state, {
        vehicleMakes: serializeVehicleMakes(action.vehicleMakes),
      });

    case Action.METADATA_GET_VEHICLE_MODEL_SUCCESS:
      return Object.assign({}, state, {
        vehicleModels: serializeVehicleModels(action.vehicleModels),
      });

    case Action.METADATA_GET_SERVICE_SUCCESS:
      return Object.assign({}, state, {
        services: action.services,
      });

    case Action.METADATA_GET_DISCOUNT_SUCCESS:
      return Object.assign({}, state, {
        discounts: action.discounts,
      });

    case Action.SERVICE_SELECT:
      let selected1 = [].concat(state.selectedServices);
      let find1 = state.services.find((service) => {
        return service.id === action.serviceId;
      });

      if (find1) {
        selected1.push(find1);
      }

      return Object.assign({}, state, {
        selectedServices: selected1,
      });

    case Action.SERVICE_DESELECT:
      let selected2 = [].concat(state.selectedServices);
      let index = selected2.findIndex((service) => {
        return service.id === action.serviceId;
      });

      if (index >= 0) {
        selected2.splice(index, 1);
      }

      return Object.assign({}, state, {
        selectedServices: selected2,
      });

    case Action.SERVICE_DETAIL:
      let service = state.services.find((service) => {
        return service.id === action.serviceId;
      });

      Reactotron.log(service);
      return Object.assign({}, state, {
        service,
      });

    default:
      return state;
  }
};