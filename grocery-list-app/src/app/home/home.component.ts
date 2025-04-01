import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ListService } from '../services/list.service';
import { Recipe } from '../models';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RecipeDetailsDialogComponent } from './recipe-details-dialog/recipe-details-dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  private recipesService = inject(RecipeService);

  readonly recipes = this.recipesService.recipes;
  readonly recipesError = this.recipesService.recipesError;


  openDialog(recipe: Recipe): void {
    const dialogRef = this.dialog.open(RecipeDetailsDialogComponent, {
      data: recipe,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }

}
