import { createAction, props } from '@ngrx/store';
import { Product } from '../../../../models/product.model';

export const searchProducts = createAction('[Product List] Search Products', props<{ searchTerm: string }>());
export const updatePageSize = createAction('[Product List] Update Page Size', props<{ pageSize: number }>());
export const updateProduct = createAction('[Product Edit] Update Product', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Product Edit] Update Product Success', props<{ product: Product }>());
export const updateProductFailure = createAction('[Product Edit] Update Product Failure', props<{ error: any }>());
export const deleteProduct = createAction('[Product List] Delete Product', props<{ id: string }>());
export const loadProducts = createAction('[Product List] Load Products');
export const loadProductsSuccess = createAction('[Product List] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product List] Load Products Failure', props<{ error: any }>());
export const addProduct = createAction('[Product Form] Add Product', props<{ product: Product }>());
export const addProductSuccess = createAction('[Product Form] Add Product Success', props<{ product: Product }>());
export const addProductFailure = createAction('[Product Form] Add Product Failure', props<{ error: any }>());

export const ProductActions = {
    searchProducts,
    updatePageSize,
    updateProduct,
    updateProductSuccess,
    updateProductFailure,
    deleteProduct,
    loadProducts,
    loadProductsSuccess,
    loadProductsFailure,
    addProduct,
    addProductSuccess,
    addProductFailure
};
