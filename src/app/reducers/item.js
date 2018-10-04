import {  RECEIVED_ITEMS} from '../types';

	
export default function item(state = [], action = {}) {
  switch (action.type) {
  case RECEIVED_ITEMS:	
    return [ ...state, action.items ];
  default:
    return state;
  }
}
