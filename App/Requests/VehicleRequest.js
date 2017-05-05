import send from './Request';


// No starting and trailing `/`
const prefix = 'car';

export const getAllVehicles = (userId) => {
  return send('POST', `${prefix}/user`, {
    user_id: userId,
  });
};

export const addVehicle = (plate, state, year, color, make, model) => {
  return send('POST', `${prefix}/new`, {
    plate, state, year, color, model,
    maker: make,
  });
};

export const updateVehicle = (carId, plate, state, year, color, make, model) => {
  return send('POST', `${prefix}/new`, {
    id: carId,
    plate, state, year, color, model,
    maker: make,
  });
};

export const deleteVehicle = (carId) => {
  return send('POST', `${prefix}/delete`, {
    id: carId,
  });
};
