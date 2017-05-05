import * as Action from '../Actions/VehicleAction';

const vehicle = {
  all: {},
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

export default (state = vehicle, action) => {
  switch (action.type) {
    case Action.VEHICLE_ADD:
    case Action.VEHICLE_UPDATE:
    case Action.VEHICLE_DELETE:
    case Action.VEHICLE_GET_ALL:
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

    case Action.VEHICLE_ADD_FAIL:
    case Action.VEHICLE_ADD_ERROR:
    case Action.VEHICLE_UPDATE_FAIL:
    case Action.VEHICLE_UPDATE_ERROR:
    case Action.VEHICLE_DELETE_FAIL:
    case Action.VEHICLE_DELETE_ERROR:
    case Action.VEHICLE_GET_ALL_FAIL:
    case Action.VEHICLE_GET_ALL_ERROR:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}