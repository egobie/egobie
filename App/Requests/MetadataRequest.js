import send from './Request';


export const getDiscounts = () => {
  return send('POST', 'user/discount');
};
