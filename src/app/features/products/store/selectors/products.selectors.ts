import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../state/products.state';

export const selectProductsState = createFeatureSelector<ProductState>('productsModule');

export const selectProducts = createSelector(
  selectProductsState,
  (state: ProductState) => state.products.products
);
