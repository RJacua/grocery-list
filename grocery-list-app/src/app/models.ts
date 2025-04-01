export interface Category {
    category_id: number;
    category_name: string;
    products: Product[];
  }
  
  
  export interface Product {
    product_id: number;
    category_id: number;
    product_name: string;
    amount_unit: string;
    product_image: string;
  }
  
  export interface Recipe {
    recipe_id: number;
    recipe_name: string;
    items: ListItem[];
  }

  export interface ListItem {
    product: Product;
    quantity: number;
  }

  export interface Result<T> {
    data: T | undefined;
    error?: string;
  }
