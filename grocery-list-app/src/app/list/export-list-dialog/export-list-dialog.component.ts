import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListItem } from '../../models';
import { CategoryService } from '../../services/category.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-export-list-dialog',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions],
  templateUrl: './export-list-dialog.component.html',
  styleUrl: './export-list-dialog.component.css'
})
export class ExportListDialogComponent {
  private categoryService = inject(CategoryService);
  readonly dialogRef = inject(MatDialogRef<ExportListDialogComponent>);
  readonly data = inject<ListItem[]>(MAT_DIALOG_DATA);

  listArea = new FormControl<string>(this.dataStringfy(this.data), { nonNullable: true });

  dataStringfy(data: ListItem[]): string {
    let dataStringfied = '';
    let catId = 0;

    data.forEach(item => {
      let itemString = item.product.product_name + ' - x' + item.quantity + item.product.amount_unit + '\n';

      if (item.product.category_id === catId) {
        dataStringfied += itemString;
      }
      else {
        this.categoryService.getCategoryById(item.product.category_id).pipe(tap((cat) => {

          if(catId !== 0){
            dataStringfied += '\n';
          }
          catId = item.product.category_id;

          dataStringfied += '=== ' + cat[0].category_name + ' ===\n';
          dataStringfied += itemString;
          dataStringfied += '\n';

        }
        )).subscribe(() =>
          this.listArea.setValue(dataStringfied)
        );

      }
    })

    return dataStringfied;
  }

  copyListToClipboard() {
    navigator.clipboard.writeText(this.listArea.value)
  }

  closeListDialog(): void {
    this.dialogRef.close();
  }
}
