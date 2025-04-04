import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form/product-form.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [
    CategoryFormComponent,
    ProductFormComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  formType = '';

  ngOnInit() {
    this.route.queryParams
      // .pipe(tap((params) => console.log(params['formType'])))
      .subscribe((params) => this.formType = params['formType']);
  }
}