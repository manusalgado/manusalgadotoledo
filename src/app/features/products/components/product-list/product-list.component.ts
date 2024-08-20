import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ProductFacade } from '../../products.facade';
import { Observable, of } from 'rxjs';
import { Product } from '../../../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  searchControl = new FormControl('');
  pageSizeControl = new FormControl(10);
  showModal = false;
  productToDeleteId: string | null = null;

  constructor(
    private productFacade: ProductFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.products$ = this.productFacade.products$;
    this.products$.subscribe(product => {
      console.log(product, 'product');
    });

    this.productFacade.loadProducts();

    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(searchTerm => {
      this.productFacade.searchProducts(searchTerm || '');
    });

    this.pageSizeControl.valueChanges.subscribe(pageSize => {
      this.productFacade.updatePageSize(pageSize || 5);
    });
  }

  openConfirmDeleteModal(productId: string) {
    this.productToDeleteId = productId;
    this.showModal = true;
  }

  onConfirmDelete() {
    if (this.productToDeleteId) {
      this.productFacade.deleteProduct(this.productToDeleteId);
      this.productToDeleteId = null;
      this.showModal = false;
    }
  }

  onCancelDelete() {
    this.productToDeleteId = null;
    this.showModal = false;
  }

  onEditProduct(productId: string) {
    this.router.navigate([`/products/edit/${productId}`]);
  }
}
