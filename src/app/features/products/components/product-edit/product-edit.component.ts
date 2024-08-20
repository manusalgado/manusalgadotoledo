import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductFacade } from '../../products.facade';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private productFacade: ProductFacade,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe(product => {
          console.log('Received product:', product);
          this.productForm.patchValue(product);
        });
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productForm.get('id')?.enable();
      
      const formValue = this.productForm.value;
      console.log('Form value before submit:', formValue);
      
      this.productFacade.updateProduct(formValue);
      this.router.navigate(['/products']);
      
      this.productForm.get('id')?.disable();
    }
  }
}
