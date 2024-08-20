import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductService } from '../../services/product.service';
import { ProductFacade } from './products.facade';
import { ProductRootReducer } from './store/reducers';
import { ProductState } from './store/state/products.state';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ConfirmDeleteModalComponent } from './components/modal/delete-modal';

export const PRODUCT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ProductState>
>('Feature ProductModule Reducers');

@NgModule({
  declarations: [ProductEditComponent, ProductFormComponent, ProductListComponent, ConfirmDeleteModalComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('productsModule', PRODUCT_REDUCER_TOKEN),
    ProductsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    { provide: PRODUCT_REDUCER_TOKEN, useValue: ProductRootReducer },
    ProductFacade,
    ProductService,
  
  ]
})
export class ProductsModule { }