import { combineReducers } from 'redux';

import shops from './reducers/shop';
import items from './reducers/item';

export default combineReducers({
  shops,
  items
}); 