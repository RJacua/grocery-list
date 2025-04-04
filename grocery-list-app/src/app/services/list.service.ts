import { Injectable, signal, Signal } from '@angular/core';
import { ListItem, Product } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  productList = signal<ListItem[]>([]);
  // itemQuantities = new Map<string, number>();

  incrementListItem(product: Product, amount?: number) {
    amount = amount || 1;
    if (this.productList().some((item) => item.product.product_name == product.product_name)) {
      this.productList.update((arr) => {
        return arr.map((arrItem) =>
          arrItem.product.product_name === product.product_name
            ? { ...arrItem, quantity: arrItem.quantity + amount }
            : arrItem
        );
      });

      // this.productList().map((item) => {
      //   if (item.product.product_name == product.product_name) {
      // item.quantity += 1;

      // this.itemQuantities.set(item.product.product_name, item.quantity)!;
      // quantity.next(item.quantity);
      //   }
      // })

    }
    else {
      // this.itemQuantities.set(product.product_name, 1);
      this.productList.update((arr) => [
        ...arr,
        { product: product, quantity: amount }
      ].sort((a, b) => a.product.category_id - b.product.category_id)
      );
      // this.productList().push({ product: product, quantity: 1 });
      console.log(product.product_name + " added to List");
    }

    // this.productList().sort((a , b) => a.product.category_id - b.product.category_id);

    // console.log("🟩", this.productList());
  }

  decrementListItem(product: Product, amount?: number) {
    // if (this.productList().some((item) => item.product.product_name == product.product_name)) {
    //   this.productList().map((item) => {
    //     if (item.product.product_name == product.product_name) {
    //       if (item.quantity > 1) {
    //         item.quantity -= 1;
    //         // this.itemQuantity.set(item.quantity);
    //       }
    //       else {
    //         this.productList().splice(this.productList().indexOf(item));
    //         // this.itemQuantity.set(0);
    //       }
    //     }
    //   })
    // }
    amount = amount || 1;
    let item = this.productList().find((item) => item.product.product_name == product.product_name);

    if (item) {
      this.productList.update((arr) => {
        if (item.quantity > amount) {
          return arr.map((arrItem) =>
            arrItem.product.product_name === product.product_name
              ? { ...arrItem, quantity: arrItem.quantity - amount }
              : arrItem
          );
        }
        else {
          return arr.filter((arrItem) =>
            !(arrItem.product.product_name === product.product_name)
          );
        }
      });
    }
    else {
      console.log("Product not found");
    }

    console.log(this.productList());
  }

  getQuantity(product_name: String): number {
    let quantity = this.productList().find(i => i.product.product_name === product_name)?.quantity ?? 0;
    return quantity
  }
}

