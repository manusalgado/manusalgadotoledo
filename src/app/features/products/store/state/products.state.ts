import { ProductsState } from '../reducers/data/products.reducer';

export type ProductState = Readonly<{
    products: ProductsState;
  }>;