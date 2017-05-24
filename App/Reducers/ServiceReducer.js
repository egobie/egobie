import * as Action from '../Actions/ServiceAction';
import Reactotron from 'reactotron-react-native';

const service = {
  all: [],
  reservations: [],
  selected: [],
  detail: null,
  queue: 0,
  openings: {},
  loading: false,
};

const serializeReservation = (reservation) => {
  let services = reservation.services.map((service) => {
    return service.name;
  });

  let day = `${reservation.day} (You can pick up your car by ${reservation.pickUpBy === 1 ? '01:00 P.M.' : '05:00 P.M.'})`;

  return {
    id: reservation.id,
    reservationId: reservation.reservationId,
    location: reservation.location,
    plate: reservation.plate,
    price: reservation.price,
    status: reservation.status,
    day, services,
  };
};

export default (state = service, action) => {
  switch (action.type) {
    case Action.SERVICE_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        all: action.services,
        loading: false,
      });

    case Action.SERVICE_GET_ALL:
    case Action.SERVICE_GET_QUEUE:
    case Action.SERVICE_GET_ALL_RESERVATION:
    case Action.SERVICE_GET_OPENING:
    case Action.SERVICE_RESERVE:
    case Action.SERVICE_CANCEL_RESERVATION:
      return Object.assign({}, state, {
        loading: true,
      });

    case Action.SERVICE_GET_ALL_ERROR:
    case Action.SERVICE_GET_ALL_FAIL:
      return Object.assign({}, state, {
        all: [],
        loading: false,
      });

    case Action.SERVICE_GET_OPENING_SUCCESS:
      return Object.assign({}, state, {
        openings: action.openings,
        loading: false,
      });

    case Action.SERVICE_GET_OPENING_ERROR:
    case Action.SERVICE_GET_OPENING_FAIL:
      return Object.assign({}, state, {
        openings: {},
        loading: false,
      });

    case Action.SERVICE_RESERVE_SUCCESS:  
    case Action.SERVICE_RESERVE_ERROR:
    case Action.SERVICE_RESERVE_FAIL:
    case Action.SERVICE_CANCEL_RESERVATION_SUCCESS:
    case Action.SERVICE_CANCEL_RESERVATION_ERROR:
    case Action.SERVICE_CANCEL_RESERVATION_FAIL:
    case Action.SERVICE_GET_QUEUE_ERROR:
    case Action.SERVICE_GET_QUEUE_FAIL:
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

    case Action.SERVICE_GET_QUEUE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        queue: action.queue,
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

    case Action.SERVICE_DESELECT_ALL:
      return Object.assign({}, state, {
        selected: [],
      });

    default:
      return state;
  }
};