import * as Action from '../Actions/MetadataAction';


const metadata = {
  vehicleMakes: [],
  vehicleModels: {},
  discounts: [],

  vehicleMake: null,
  vehicleModel: null,
};

const serializeVehicleMakes = (makes) => {
  return makes.map((make) => {
    return {
      key: make.id,
      label: make.title,
    };
  });
};

const serializeVehicleModels = (models) => {
  let result = {};

  models.forEach((model) => {
    result[model.maker_id] = result[model.maker_id] ? result[model.maker_id] : [];
    result[model.maker_id].push({
      key: model.id,
      label: model.title,
    });
  });

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

    case Action.METADATA_GET_DISCOUNT_SUCCESS:
      return Object.assign({}, state, {
        discounts: action.discounts,
      });

    default:
      return state;
  }
};