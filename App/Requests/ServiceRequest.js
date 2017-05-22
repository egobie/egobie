import send from './Request';


// No starting and trailing `/`
const prefix = 'service';

export const getAllServices = () => {
  return send('POST', `${prefix}`);
};

export const getAllReservations = () => {
  return send('POST', `${prefix}/reservation`);
};

export const reserveService = (carId, note, opening, services) => {
  return send('POST', `${prefix}/order`, {
    carId, note, opening, services,
  });
};

export const cancelReservation = (id) => {
  return send('POST', `${prefix}/cancel`, {
    id,
  });
};

export const getOpenings = (latitude, longitude) => {
  return send('POST', `${prefix}/opening`, {
    latitude, longitude,
  });
};

export const getQueues = (date) => {
  return send('POST', `${prefix}/queue`, {
    date,
  });
};
