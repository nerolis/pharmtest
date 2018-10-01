import { RECEIVED_ITEMS, ITEMS_ERROR} from '../types';

import axios from 'axios';

const receivedItems = items => ({ 
  type: RECEIVED_ITEMS, 
  items 
});
  
const itemsError = err => ({ 
  type: ITEMS_ERROR, 
  err
});

const authorization = {
  headers: { Authorization: 'superSectetToken' } 
};

export const fetchItem = (shopName, productId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/shop/${shopName}/${productId}`, authorization);

    if (!data) {
      return dispatch(itemsError('no data'));
    }

    return dispatch(receivedItems(data));
  } catch (err) {
    dispatch(itemsError(err));
  }
};
  