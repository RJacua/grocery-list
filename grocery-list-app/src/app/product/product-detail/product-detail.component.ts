import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, computed, inject, input, Input, signal, Signal } from '@angular/core';
import { ListItem, Product } from '../../models';
import { ProductService } from '../../services/product.service';
import { from, of, tap } from 'rxjs';
import { ListService } from '../../services/list.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  readonly listService = inject(ListService)
  readonly productList = this.listService.productList

  selectedProduct = input<Product | null>();
  quantity = computed(() => this.productList().find((i) => i.product.product_name === this.selectedProduct()?.product_name)?.quantity)

  addToList(product: Product) {
    this.listService.incrementListItem(product);
  }

  removeFromList(product: Product) {
    this.listService.decrementListItem(product);
  }

}