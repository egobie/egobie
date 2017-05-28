import send from './Request';
import Reactotron from 'reactotron-react-native';

// No starting and trailing `/`
const prefix = 'service';

export const getAllServices = () => {
  return send('POST', `${prefix}`);
};

export const getAllReservations = () => {
  return send('POST', `${prefix}/reservation`);
};

export const reserveService = (carId, note, placeId, opening, pickUpBy, services, addons) => {
  Reactotron.log('reserveService');
  let temp = {
    carId, note, placeId, opening, pickUpBy, services, addons,
  };
  Reactotron.log(temp);
  return send('POST', `${prefix}/order`, {
    carId, note, placeId, opening, pickUpBy, services, addons,
  });
};

export const cancelReservation = (id) => {
  return send('POST', `${prefix}/cancel`, {
    id,
  });
};

export const getOpenings = (id, latitude, longitude) => {
  return send('POST', `${prefix}/opening`, {
    id, latitude, longitude,
  });
};

export const getQueues = (id, latitude, longitude) => {
  return send('POST', `${prefix}/opening/today`, {
    id, latitude, longitude,
  });
};

export const getPlaces = () => {
  return send('POST', `${prefix}/place`);
};
