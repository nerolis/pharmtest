import { RECEIVED_SHOPS, SHOPS_ERROR} from '../types';

import axios from 'axios';
 
const authorization = {
  headers: { Authorization: 'superSecretToken' } 
};

const receivedShops = shops => ({ 
  type: RECEIVED_SHOPS, 
  shops 
});

const shopsError = err => ({ 
  type: SHOPS_ERROR, 
  err
});


export const fetchShops = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/shoplist', authorization);
    return dispatch(receivedShops(data.shops));

  } catch (err) {
    dispatch(shopsError(err));
  }
};
