import * as Action from '../Actions/MetadataAction';


const metadata = {
  discounts: [],
};

export default (state = metadata, action) => {
  switch (action.type) {
    case Action.METADATA_GET_DISCOUNT_SUCCESS:
      return Object.assign({}, state, {
        discounts: action.discounts,
      });

    default:
      return state;
  }
};