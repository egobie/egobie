import send from './Request';


const prefix = '';

export const signIn = (email, password) => {
  return send('POST', 'signin', {
    email, password,
  });
};

export const signUp = (email, password, fullName, phoneNumber, coupon) => {
  return send('POST', 'signup', {
    email, password, fullName, phoneNumber, coupon,
  });
};