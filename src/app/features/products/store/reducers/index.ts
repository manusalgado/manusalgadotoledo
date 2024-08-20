import { combineReducers } from '@ngrx/store';
import { productReducer as products } from './data/products.reducer';

export const ProductRootReducer = combineReducers({
  products
})