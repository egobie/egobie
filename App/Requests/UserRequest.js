import send from './Request';


const prefix = '';

export const signIn = (email, password) => {
  return send('POST', 'signin', {
    email, password,
  });
};

export const signUp = (email, password, firstName, lastName, phoneNumber, coupon) => {
  return send('POST', 'signup', {
    email, password, firstName, lastName, phoneNumber, coupon,
  });
};