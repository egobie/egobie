import send from './Request';


// No starting and trailing `/`
const prefix = 'reset';

export const validateEmail = (email) => {
  return send('POST', `${prefix}/step1`, {
    email,
  });
};

export const validateToken = (userId, token) => {
  return send('POST', `${prefix}/step2`, {
    userId, token,
  });
};

export const resendToken = (userId, email) => {
  return send('POST', `${prefix}/resend`, {
    userId, email,
  });
};

export const newPassword = (userId, token, password) => {
  return send('POST', `${prefix}/step3`, {
    userId, token, password,
  });
};