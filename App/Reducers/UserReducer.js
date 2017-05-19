import * as Action from '../Actions/UserAction';
import Reactotron from 'reactotron-react-native';

const user = {
  id: -1,
  type: '',
  password: '',
  coupon: '',
  discount: -1,
  firstTime: -1,
  couponDiscount: -1,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  signedIn: false,
  loading: false,
};

const serializeUser = (user) => {
  return {
    id: user.id,
    type: user.type,
    password: user.password,
    coupon: user.coupon,
    discount: user.discount,
    firstTime: user.firstName,
    couponDiscount: user.couponDiscount,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };
};

export default (state = user, action) => {
  switch (action.type) {
    case Action.USER_SIGN_IN:
    case Action.USER_SIGN_UP:
      return Object.assign({}, state, {
        loading: true,
      });

    case Action.USER_SIGN_IN_SUCCESS:
    case Action.USER_SIGN_UP_SUCCESS:
      let user = serializeUser(action.user);
      return Object.assign({}, state, {
        signedIn: true,
        loading: false,
        ...user,
      });

    case Action.USER_SIGN_IN_FAIL:
    case Action.USER_SIGN_IN_ERROR:
    case Action.USER_SIGN_UP_FAIL:
    case Action.USER_SIGN_UP_ERROR:
    case Action.USER_SIGN_OUT:
      return Object.assign({}, state, {
        id: -1,
        type: '',
        password: '',
        coupon: '',
        discount: -1,
        firstTime: -1,
        couponDiscount: -1,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        signedIn: false,
        loading: false,
      });

    default:
      return state;
  }
};
