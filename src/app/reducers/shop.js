import {  RECEIVED_SHOPS} from '../types';

	
export default function shop(state = [], action = {}) {
  switch (action.type) {
  case RECEIVED_SHOPS:	
    return [ ...state, ...action.shops ];
  default:
    return state;
  }
}