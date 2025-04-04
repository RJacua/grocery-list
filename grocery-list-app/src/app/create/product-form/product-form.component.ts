import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { Category } from '../../models';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  private router = inject(Router);
  private readonly productSvc = inject(ProductService);
  private readonly categorySvc = inject(CategoryService);

  productForm = new FormGroup({
    productName: new FormControl<String>('', { nonNullable: true, validators: [Validators.required] }),
    unit: new FormControl<String>('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl<Category | null>(null, { nonNullable: true, validators: [Validators.required] }),
  });

  get productName() {
    return this.productForm.controls.productName;
  }
  get unit() {
    return this.productForm.controls.unit;
  }
  get category() {
    return this.productForm.controls.category;
  }
  readonly categories = this.categorySvc.categories;

  saveProduct() {
    this.productSvc.saveProduct(this.productForm.getRawValue())
    .pipe(tap(() => console.log(this.productForm.getRawValue())))
    .subscribe(
      () => {
        let category = this.productForm.getRawValue().category; 
        this.router.navigate(['/product'], { queryParams: { category: category?.category_name} });
      }
    );
  }
}
