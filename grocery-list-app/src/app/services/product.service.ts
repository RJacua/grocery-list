import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
// import { Category, Product } from '../models.ts';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private readonly productsUrlPrefix: string = "api/products";
  private readonly route = inject(ActivatedRoute);

  readonly selectedProductName = this.route.queryParamMap.pipe(
    map((params) => params.get('product')),
    // tap((params) => console.log(params))
  );

  readonly selectedProduct$: Observable<Product | null> = this.selectedProductName.pipe(
    switchMap((name) => {
      if (name) {
        // console.log(this.getProductByName(name));
        return this.getProductByName(name)
      }
      else {
        return of(null)
      }
    }),
  )

  readonly selectedProductSignal = toSignal(this.selectedProduct$);

    getProductsUrl(categoryId: number) {
      // console.log(categoryId);
      return this.productsUrlPrefix + "?category_id=" + categoryId;
    }

  getProductByName(name: string): Observable<Product | null> {

    return this.http.get<Product[]>(this.productsUrlPrefix + "?product_name=" + name).pipe(
      map((p) => p.length ? p[0] : null)
    )
  }

   saveProduct(newProd: any): Observable<Product> {
          const headers = { headers: { 'Content-Type': 'application/json' } };

          let newProduct: Partial<Product> = { category_id: newProd.category.id, product_name: newProd.productName, amount_unit: " " + newProd.unit, product_image: "" }
          console.log("newProduct: ", newProduct)
          return this.http.post<Product>('api/products', newProduct, headers);
      }
  

}