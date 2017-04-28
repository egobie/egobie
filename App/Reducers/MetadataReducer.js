import * as Action from '../Actions/MetadataAction';


const metadata = {
  vehicleMakes: {},
  vehicleModels: {},
  services: [],
  discounts: [],
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
      return Object.assign({}, state, serializeVehicleMakes(action.vehicleMakes));

    case Action.METADATA_GET_VEHICLE_MODEL_SUCCESS:
      return Object.assign({}, state, serializeVehicleModels(action.vehicleModels));

    case Action.METADATA_GET_SERVICE_SUCCESS:
      return Object.assign({}, state, action.services);

    case Action.METADATA_GET_DISCOUNT_SUCCESS:
      return Object.assign({}, state, action.discounts);

    default:
      return state;
  }
};