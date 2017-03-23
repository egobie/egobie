import send from './Request';

// No trailing `/`
const prefix = '/service';

export const getAllServices = () => {
  return send('POST', `${prefix}`);
};
