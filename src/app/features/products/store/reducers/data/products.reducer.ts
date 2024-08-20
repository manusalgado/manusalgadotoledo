import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../models/product.model';
import { ProductActions } from '../../actions/products.actions';

export interface ProductsState {
  products: Product[];
  pageSize: number;
}

export const initialState: ProductsState = {
  products: [],
  pageSize: 10
};

const _productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(ProductActions.addProductSuccess, (state, { product }) => ({ ...state, products: [...state.products, product] })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ProductActions.deleteProduct, (state, { id }) => ({
    ...state,
    products: state.products.filter(product => product.id !== id)
  })),
  on(ProductActions.searchProducts, (state, { searchTerm }) => {
    const safeSearchTerm = searchTerm || '';
    return {
      ...state,
      products: state.products.filter(product =>
        product.name.toLowerCase().includes(safeSearchTerm.toLowerCase())
      )
    };
  }),
  on(ProductActions.updatePageSize, (state, { pageSize }) => ({
    ...state,
    pageSize: pageSize ?? 10
  }))
);

export function productReducer(state: ProductsState | undefined, action: any) {
  return _productReducer(state, action);
}
