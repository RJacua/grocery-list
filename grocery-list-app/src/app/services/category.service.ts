import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, filter, from, map, merge, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Category, Product, Result } from '../models';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categoriesUrl = 'api/categories';

    private http = inject(HttpClient);
    private productService = inject(ProductService)

    selectedCategoryId = signal<number>(0)

    private categoriesResult$ = this.http.get<Category[]>(this.categoriesUrl)
        .pipe(
            map(p => ({ data: p, error: undefined }) as Result<Category[]>),
            // tap(p => console.log("All cats: ", JSON.stringify(p))),
            shareReplay(1),
            catchError(err => of(({
                data: [],
                error: 'this.errorService.formatError(err)'
            }) as Result<Category[]>))
        );
    private categoriesResult = toSignal(this.categoriesResult$,
        { initialValue: ({ data: [], error: undefined }) as Result<Category[]> });

    categories = computed(() => this.categoriesResult().data);
    categoriesError = computed(() => this.categoriesResult().error);

    private categoriesWithProductsResult$ = toObservable(this.selectedCategoryId)
        .pipe(
            // filter(Boolean),
            // tap(p => console.log("Category Result Tap 1: ", p, typeof p)),
            switchMap(id => {
                let categoryUrl = this.categoriesUrl;
                if (id != 0) {
                    categoryUrl = this.categoriesUrl + '?category_id=' + id;
                }
                return this.http.get<Category[]>(categoryUrl)
                    .pipe(
                        // tap(c => console.log("Category Result: ", c)),
                        switchMap(category => this.getCategoryWithProducts(category))
                    );
            }),
            map(p => ({
                data: p
            }) as Result<Category[]>),
            catchError(err => of(({
                data: undefined,
                error: 'this.errorService.formatError(err)'
            }) as Result<Category[]>))
        );

    private categoriesWithProductsResult = toSignal(this.categoriesWithProductsResult$);

    categoriesWithProducts = computed(() => this.categoriesWithProductsResult()?.data);
    categoriesWithProductsError = computed(() => this.categoriesWithProductsResult()?.error);

    getCategoryWithProducts(categories: Category[]): Observable<Category[]> {

        return combineLatest(categories.map((category) =>
            this.http.get<Product[]>(this.productService.getProductsUrl(category.category_id))
                .pipe(
                    // tap((products) => console.log("Products by cat: ", JSON.stringify(products))),
                    map(products => ({ ...category, products } as Category)),

                )
        ));

    }

    categorySelected(categorySelectedId: number): void {
        // console.log("Category Selected: ", categorySelectedId);
        this.selectedCategoryId.set(categorySelectedId);
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        const formattedMessage = 'this.errorService.formatError(err)';
        return throwError(() => formattedMessage);
    }
}
