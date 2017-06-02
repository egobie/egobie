import * as Action from '../Actions/PaymentAction';


const payment = {

};

const serializePayment = (payment) => {
  return {
    id: payment.id,
    userId: payment.userId,
    accountName: payment.account_name,
    accountNumber: payment.account_number,
    accountType: payment.account_type,
    cardType: payment.card_type,
    code: payment.code,
    expireMonth: payment.expire_month,
    expireYear: payment.expire_year,
    reserved: payment.reserved,
  };
};

export default (state = payment, action) => {
  switch (action.type) {
    case Action.PAYMENT_UPDATE_SUCCESS:
    case Action.PAYMENT_ADD_SUCCESS:
      return Object.assign({}, state, serializePayment(action.payment));

    case Action.PAYMENT_ADD_ERROR:
    case Action.PAYMENT_ADD_FAIL:
    case Action.PAYMENT_DELETE_SUCCESS:
    case Action.PAYMENT_DELETE_FAIL:
    case Action.PAYMENT_DELETE_ERROR:
      return Object.assign({}, payment);

    default:
      return state;
  }
};