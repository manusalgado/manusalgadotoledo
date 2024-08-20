import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductState } from './store/state/products.state';
import { selectProducts } from './store/selectors/products.selectors';
import { ProductActions } from './store/actions/products.actions';
import { ProductService } from '../../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  products$: Observable<Product[]>;

  constructor(private store: Store<ProductState>, private productService: ProductService) {
    this.products$ = this.store.select(selectProducts)
  }

  searchProducts(searchTerm: string) {
    this.store.dispatch(ProductActions.searchProducts({ searchTerm }));
  }

  updatePageSize(pageSize: number) {
    this.store.dispatch(ProductActions.updatePageSize({ pageSize }));
  }

  deleteProduct(id: string) {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).pipe(
      map(updatedProduct => this.store.dispatch(ProductActions.updateProductSuccess({ product: updatedProduct }))),
      catchError(error => {
        this.store.dispatch(ProductActions.updateProductFailure({ error }));
        return of();
      })
    ).subscribe();
  }

  loadProducts() {
    this.productService.getProducts().pipe(
      map(products => this.store.dispatch(ProductActions.loadProductsSuccess({ products: products.data }))),
      catchError(error => {
        this.store.dispatch(ProductActions.loadProductsFailure({ error }));
        return of([]);
      })
    ).subscribe();
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).pipe(
      map(newProduct => this.store.dispatch(ProductActions.addProductSuccess({ product: newProduct }))),
      catchError(error => {
        this.store.dispatch(ProductActions.addProductFailure({ error }));
        return of();
      })
    ).subscribe();
  }
}
