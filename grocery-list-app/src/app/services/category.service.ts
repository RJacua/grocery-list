import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, map, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { Category, Product, Result } from '../models';
import { ProductService } from './product.service';
import { Router } from '@angular/router';


interface catInterface {
    categoryName: string,
    categoryOrder: number
}

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    private categoriesUrl = 'api/categories';

    private http = inject(HttpClient);
    private productService = inject(ProductService);
    private router = inject(Router);

    selectedCategoryId = signal<number>(0)

    private categoriesResult$ = this.http.get<Category[]>(this.categoriesUrl)
        .pipe(
            map(p => ({ data: p, error: undefined }) as Result<Category[]>),
            tap(p => console.log("All cats: ", p)),
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
            switchMap(id => {

                let categoryUrl = this.categoriesUrl + '?id=' + id;

                return this.http.get<Category[]>(categoryUrl)
                    .pipe(
                        // tap(c => console.log("Category Result: ", c)),
                        switchMap(category => this.getCategoryWithProducts(category)),
                        // tap(c => console.log("Category With Product: ", c)),
                    );
            }),
            map(p => ({
                data: p
            }) as Result<Category[]>),
            // catchError(err => of(({
            //     data: undefined,
            //     error: 'this.errorService.formatError(err)'
            // }) as Result<Category[]>))
        );

    private categoriesWithProductsResult = toSignal(this.categoriesWithProductsResult$);

    categoriesWithProducts = computed(() => this.categoriesWithProductsResult()?.data);
    categoriesWithProductsError = computed(() => this.categoriesWithProductsResult()?.error);

    getCategoryWithProducts(categories: Category[]): Observable<Category[]> {
        
        return combineLatest(categories.map((category) =>
            this.http.get<Product[]>(this.productService.getProductsUrl(category.id))
                .pipe(
                    map(products => ({ ...category, products } as Category)),
                )
        ));
    }

    categorySelected(categorySelectedId: number): void {
        console.log("Category Selected Id: ", categorySelectedId);
        this.selectedCategoryId.set(categorySelectedId);
    }

    getCategoryById(id: number): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl + '?id=' + id);
    }

    saveCategory(newCat: any): Observable<Category> {
        const headers = { headers: { 'Content-Type': 'application/json' } };

        const cats = this.categories();
        if(!cats) return of();

        let newCategory = { category_name: newCat.categoryName, products: [], order: newCat.categoryOrder - 1};

        return this.http.post<Category>('api/categories', newCategory, headers);

        // console.log('/product?category=' + newCat.categoryName);
        // this.router.navigate(['/product'], {queryParams: {category: newCat.categoryName}})
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        const formattedMessage = 'this.errorService.formatError(err)';
        return throwError(() => formattedMessage);
    }
}
