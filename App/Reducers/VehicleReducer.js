import * as Action from '../Actions/VehicleAction';


const vehicle = {
  all: [],
  makes: [],
  models: {},
  loading: false,
};

const serializeVehicle = (car) => {
  return {
    id: car.id,
    userId: car.user_id,
    reportId: car.report_id,
    plate: car.plate,
    state: car.state,
    year: car.year,
    color: car.color,
    make: car.maker,
    model: car.model,
    makeId: car.maker_id,
    modelId: car.model_id,
    reserved: car.reserved,
  };
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

export default (state = vehicle, action) => {
  switch (action.type) {
    case Action.VEHICLE_ADD:
    case Action.VEHICLE_UPDATE:
    case Action.VEHICLE_DELETE:
    case Action.VEHICLE_GET_ALL:
    case Action.VEHICLE_GET_MAKE:
    case Action.VEHICLE_GET_MODEL:
      return Object.assign({}, state, {
        loading: true,
      });

    case Action.VEHICLE_ADD_SUCCESS:
      let newAll = [].concat(state.all);
      newAll.push(serializeVehicle(action.car));
      return Object.assign({}, state, {
        all: newAll,
        loading: false,
      });

    case Action.VEHICLE_UPDATE_SUCCESS:
      let updateAll = [].concat(state.all);
      let updateIndex = updateAll.findIndex((car) => {
        return car.id === action.car.id;
      });

      if (updateIndex !== -1) {
        updateAll.splice(updateIndex, 1, serializeVehicle(action.car));
      }

      return Object.assign({}, state, {
        all: updateAll,
        loading: false,
      });

    case Action.VEHICLE_DELETE_SUCCESS:
      let deleteAll = [].concat(state.all);
      let deleteIndex = deleteAll.findIndex((car) => {
        return car.id === action.carId;
      });

      if (deleteIndex !== -1) {
        deleteAll.splice(deleteIndex, 1);
      }

      return Object.assign({}, state, {
        all: deleteAll,
        loading: false,
      });

    case Action.VEHICLE_GET_ALL_SUCCESS:
      let all = action.cars.map((car) => {
        return serializeVehicle(car);
      });

      return Object.assign({}, state, {
        all: all,
        loading: false,
      });

    case Action.VEHICLE_GET_MAKE_SUCCESS:
      return Object.assign({}, state, {
        makes: serializeVehicleMakes(action.makes),
        loading: false,
      });

    case Action.VEHICLE_GET_MODEL_SUCCESS:
      return Object.assign({}, state, {
        models: serializeVehicleModels(action.models),
        loading: false,
      });

    case Action.VEHICLE_ADD_FAIL:
    case Action.VEHICLE_ADD_ERROR:
    case Action.VEHICLE_UPDATE_FAIL:
    case Action.VEHICLE_UPDATE_ERROR:
    case Action.VEHICLE_DELETE_FAIL:
    case Action.VEHICLE_DELETE_ERROR:
    case Action.VEHICLE_GET_ALL_FAIL:
    case Action.VEHICLE_GET_ALL_ERROR:
    case Action.VEHICLE_GET_MAKE_FAIL:
    case Action.VEHICLE_GET_MAKE_ERROR:
    case Action.VEHICLE_GET_MODEL_FAIL:
    case Action.VEHICLE_GET_MODEL_ERROR:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}