import send from './Request';


const prefix = 'user';

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

export const updateUser = (firstName, lastName, email, phoneNumber) => {
  return send('POST', `${prefix}/update/user`, {
    firstName, lastName, email, phoneNumber,
  });
};