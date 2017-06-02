import send from './Request';


// No starting and trailing `/`
const prefix = 'payment';

export const addPayment = (accountName, accountNumber, accountType, cardType, code, expireMonth, expireYear) => {
  return send('POST', `${prefix}/new`, {
    account_name: accountName,
    account_number: accountNumber,
    account_type: accountType,
    card_type: cardType,
    code: code,
    expire_month: expireMonth,
    expire_year: expireYear,
  });
};

export const deletePayment = (id) => {
  return send('POST', `${prefix}/delete`, {
    id,
  });
};