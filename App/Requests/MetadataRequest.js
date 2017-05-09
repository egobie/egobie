import send from './Request';


export const getVehicleMakes = () => {
  return send('POST', 'car/maker');
};

export const getVehicleModels = () => {
  return send('POST', 'car/model');
};

export const getDiscounts = () => {
  return send('POST', 'user/discount');
};
