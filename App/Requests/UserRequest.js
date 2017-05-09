import send from './Request';


const prefix = '';

export const signIn = (username, password) => {
  return send('POST', 'signin', {
    username, password,
  });
};

export const signUp = (username, password, email, phoneNumber, coupon) => {
  return send('POST', 'signup', {
    username, password, email, coupon,
    phone_number: phoneNumber,
  });
};