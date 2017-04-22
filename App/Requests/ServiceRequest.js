import send from './Request';

// No starting and trailing `/`
const prefix = 'service';

export const getAllServices = () => {
  return send('POST', `${prefix}`);
};
