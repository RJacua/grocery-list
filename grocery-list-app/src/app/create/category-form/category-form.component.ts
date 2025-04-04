import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})

export class CategoryFormComponent {

  private router = inject(Router);
  private readonly categorySvc = inject(CategoryService);

  categoryForm = new FormGroup({
    categoryName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    categoryOrder: new FormControl<number | null>(null),
  });

  get categoryName() {
    return this.categoryForm.controls.categoryName;
  }
  get categoryOrder() {
    return this.categoryForm.controls.categoryOrder;
  }

  saveCategory() {
    let categories = this.categorySvc.categories();
    if (categories) {
      if (this.categoryOrder.value === null) this.categoryOrder.setValue(categories.length + 1);
      this.categorySvc.saveCategory(this.categoryForm.getRawValue()).subscribe(() =>
        this.router.navigate(['/product'], { queryParams: { category: this.categoryForm.getRawValue().categoryName } })
      );
    }
    // console.log(this.categoryForm.getRawValue())
  }

}