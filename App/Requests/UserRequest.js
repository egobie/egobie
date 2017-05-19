import send from './Request';


const prefix = '';

export const signIn = (email, password) => {
  return send('POST', 'signin', {
    email, password,
  });
};

export const signUp = (password, email, phoneNumber, coupon) => {
  return send('POST', 'signup', {
    email, password, coupon,
    phone_number: phoneNumber,
  });
};