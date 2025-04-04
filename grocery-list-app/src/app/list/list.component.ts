import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ListService } from '../services/list.service';
import { ListItem, Product } from '../models';
import { ExportListDialogComponent } from './export-list-dialog/export-list-dialog.component';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  readonly dialog = inject(MatDialog);

  private listService = inject(ListService);
  readonly productList = this.listService.productList;

  openListDialog(list: ListItem[]) {
    const dialogRef = this.dialog.open(ExportListDialogComponent, {
      data: list,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

    addToList(product: Product) {
      this.listService.incrementListItem(product);
    }
  
    removeFromList(product: Product) {
      this.listService.decrementListItem(product);
    }

  }
