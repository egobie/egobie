import * as Action from '../Actions/VehicleAction';
import Reactotron from 'reactotron-react-native';

const vehicle = {
  all: [],
  makes: [],
  models: {},
  loading: false,
  selected: null,
};

const serializeVehicle = (car) => {
  return {
    id: car.id,
    userId: car.userId,
    reportId: car.reportId,
    plate: car.plate,
    state: car.state,
    year: car.year,
    color: car.color,
    make: car.make,
    model: car.model,
    makeId: car.makeId,
    modelId: car.modelId,
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
    result[model.makeId] = result[model.makeId] ? result[model.makeId] : [];
    result[model.makeId].push({
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
    case Action.VEHICLE_DELETE_SUCCESS:
      return Object.assign({}, state, {
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

    case Action.VEHICLE_SELECT:
      let car = state.all.find((car) => {
        return car.id === action.id;
      });

      return Object.assign({}, state, {
        selected: car,
      });

    case Action.VEHICLE_DESELECT:
      return Object.assign({}, state, {
        selected: null,
      });

    default:
      return state;
  }
}