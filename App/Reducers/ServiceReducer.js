import * as Action from '../Actions/ServiceAction';
import Reactotron from 'reactotron-react-native';

const service = {
  all: [],
  reservations: [],
  selected: [],
  detail: null,
  loading: false,
};

const serializeReservation = (reservation) => {
  let services = reservation.services.map((service) => {
    return service.name;
  });

  return {
    id: reservation.id,
    reservationId: reservation.reservation_id,
    location: reservation.location,
    plate: reservation.plate,
    time: reservation.time,
    price: reservation.price,
    status: reservation.status,
    services: services,
  };
};

export default (state = service, action) => {
  switch (action.type) {
    case Action.SERVICE_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        all: action.services,
      });

    case Action.SERVICE_RESERVE:
    case Action.SERVICE_CANCEL_RESERVATION:
    case Action.SERVICE_GET_ALL_RESERVATION:
      return Object.assign({}, state, {
        loading: true,
      });

    case Action.SERVICE_RESERVE_SUCCESS:  
    case Action.SERVICE_RESERVE_ERROR:
    case Action.SERVICE_RESERVE_FAIL:
    case Action.SERVICE_CANCEL_RESERVATION_SUCCESS:
    case Action.SERVICE_CANCEL_RESERVATION_ERROR:
    case Action.SERVICE_CANCEL_RESERVATION_FAIL:
      return Object.assign({}, state, {
        loading: false,
      });

    case Action.SERVICE_GET_ALL_RESERVATION_SUCCESS:
      let reservations = action.reservations.map((reservation) => {
        return serializeReservation(reservation);
      });

      return Object.assign({}, state, {
        reservations,
        loading: false,
      });

    case Action.SERVICE_GET_ALL_RESERVATION_ERROR:
    case Action.SERVICE_GET_ALL_RESERVATION_FAIL:
      return Object.assign({}, state, {
        reservations: [],
        loading: false,
      });

    case Action.SERVICE_SHOW:
      let service = state.all.find((service) => {
        return service.id === action.id;
      });

      return Object.assign({}, state, {
        detail: service,
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
        let indexOfSameService = selected1.findIndex((service) => {
          return service.type === find1.type;
        });

        if (indexOfSameService >= 0) {
          selected1.splice(indexOfSameService, 1, find1);
        } else {
          selected1.push(find1);
        }
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