import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { computed, inject, Injectable } from '@angular/core';
import { Recipe, Result } from '../models';
import { catchError, map, of, shareReplay, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'api/recipes';

  private http = inject(HttpClient);

  private recipesResult$ = this.http.get<Recipe[]>(this.recipesUrl)
        .pipe(
            map(p => ({ data: p, error: undefined }) as Result<Recipe[]>),
            // tap(p => console.log("All recipes: ", JSON.stringify(p))),
            shareReplay(1),
            catchError(err => of(({
                data: [],
                error: 'this.errorService.formatError(err)'
            }) as Result<Recipe[]>))
        );
    private recipesResult = toSignal(this.recipesResult$,
        { initialValue: ({ data: [], error: undefined }) as Result<Recipe[]> });

    recipes = computed(() => this.recipesResult().data);
    recipesError = computed(() => this.recipesResult().error);




}
