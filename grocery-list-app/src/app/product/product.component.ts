import { Component, computed, effect, inject, Injector, OnInit, Signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, Observable, startWith, tap } from 'rxjs';
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';
import { Category, Product } from '../models';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../services/product.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductDetailComponent,
    RouterLink,
    ProductDetailComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  readonly listService = inject(ListService);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  private router = inject(Router);
  readonly ROUTER_TOKENS = ROUTER_TOKENS;

  // // USADOS COM O EFFECT
  // private _injector = inject(Injector);

  categoryForm = new FormControl<Category | null>(null);

  categories = this.categoryService.categories
  categoriesError = this.categoryService.categoriesError

  private observedCategories = toObservable(this.categories);

  categoriesWithProducts = this.categoryService.categoriesWithProducts;
  categoriesWithProductsError = this.categoryService.categoriesWithProductsError;

  constructor(private route: ActivatedRoute) {
    this.listenCategoryChange();
  }

  ngOnInit(): void {
    const categoryName = this.route.snapshot.queryParamMap.get('category');
    const productName = this.route.snapshot.queryParamMap.get('product');

    // // OU COM EFFECT
    // effect(() => {
    //   const selectedCategory = this.categories()?.find(cat => cat.category_name === categoryName) || null;

    //   this.categoryForm.setValue(selectedCategory);
    // }, { injector: this._injector });


    this.observedCategories.subscribe((c) => {
      this.categoryForm.setValue(c?.find(cat => cat.category_name === categoryName) || null),
        this.setCategoryRoute(productName)
    }
    )
  }

  listenCategoryChange() {
    this.categoryForm.valueChanges
      // .pipe(tap((value) => console.log("value: ", value?.id)))
      .subscribe({
        next: (value) => {
          this.categoryService.categorySelected(value?.id ?? 0);
          this.setCategoryRoute();
        },
      })
  }

  setCategoryRoute(productName?: string | null) {
    productName = productName || null
    this.router.navigate([], {
      queryParams: this.categoryForm.value ? { category: this.categoryForm.value.category_name, product: productName } : { category: null, product: productName },
      queryParamsHandling: 'merge'
    });
  }

  selectedProduct$ = this.productService.selectedProduct$;
  selectedProduct = toSignal(this.selectedProduct$);

  isInCategory = computed(() => this.categoryService.categoriesWithProducts()?.some(cat =>
    cat.products.some(prod =>
      prod.product_name === this.selectedProduct()?.product_name))
    || false);

  addToList(product: Product) {
    this.listService.incrementListItem(product);
  }

  getQuantity(product_name: string): number {
    return this.listService.getQuantity(product_name);
  }

}
