import send from './Request';


// No starting and trailing `/`
const prefix = 'car';

export const getVehicleMakes = () => {
  return send('POST', `${prefix}/maker`);
};

export const getVehicleModels = () => {
  return send('POST', `${prefix}/model`);
};

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

export const updateVehicle = (id, plate, state, year, color, make, model) => {
  return send('POST', `${prefix}/update`, {
    id, plate, state, year, color, model,
    maker: make,
  });
};

export const deleteVehicle = (id) => {
  return send('POST', `${prefix}/delete`, {
    id,
  });
};
