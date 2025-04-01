import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../../models';
import { CommonModule } from '@angular/common';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-recipe-details-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions],
  templateUrl: './recipe-details-dialog.component.html',
  styleUrl: './recipe-details-dialog.component.css'
})
export class RecipeDetailsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RecipeDetailsDialogComponent>);

  readonly data = inject<Recipe>(MAT_DIALOG_DATA);

  readonly listService = inject(ListService)

  addRecipeToList(recipe: Recipe) {
    recipe.items.forEach(item => this.listService.incrementListItem(item.product, item.quantity));
  }

  removeRecipeFromList(recipe: Recipe) {
    recipe.items.forEach(item => this.listService.decrementListItem(item.product, item.quantity));
  }

  closeRecipeDialog(): void {
    this.dialogRef.close();
  }

}