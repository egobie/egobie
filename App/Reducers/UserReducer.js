import * as Action from '../Actions/UserAction';
import Reactotron from 'reactotron-react-native';

const user = {
  id: -1,
  type: '',
  username: '',
  password: '',
  coupon: '',
  discount: -1,
  firstTime: -1,
  couponDiscount: -1,
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  phoneNumber: '',
  homeAddressState: '',
  homeAddressZip: '',
  homeAddressCity: '',
  homeAddressStreet: '',
  workAddressState: '',
  workAddressZip: '',
  workAddressCity: '',
  workAddressStreet: '',
  signedIn: false,
  loading: false,
};

const serializeUser = (user) => {
  return {
    id: user.id,
    type: user.type,
    username: user.username,
    password: user.password,
    coupon: user.coupon,
    discount: user.discount,
    firstTime: user.first_name,
    couponDiscount: user.coupon_discount,
    firstName: user.first_name,
    lastName: user.last_name,
    middleName: user.middle_name,
    email: user.email,
    phoneNumber: user.phone_number,
    homeAddressState: user.home_address_state,
    homeAddressZip: user.home_address_zip,
    homeAddressCity: user.home_address_city,
    homeAddressStreet: user.home_address_street,
    workAddressState: user.work_address_state,
    workAddressZip: user.work_address_zip,
    workAddressCity: user.work_address_city,
    workAddressStreet: user.work_address_street,
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
        username: '',
        password: '',
        coupon: '',
        discount: -1,
        firstTime: -1,
        couponDiscount: -1,
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        phoneNumber: '',
        homeAddressState: '',
        homeAddressZip: '',
        homeAddressCity: '',
        homeAddressStreet: '',
        workAddressState: '',
        workAddressZip: '',
        workAddressCity: '',
        workAddressStreet: '',
        signedIn: false,
        loading: false,
      });

    default:
      return state;
  }
};
