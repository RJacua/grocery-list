export interface Category {
    id: number;
    category_name: string;
    products: Product[];
  }
  
  
  export interface Product {
    id: number;
    category_id: number;
    product_name: string;
    amount_unit: string;
    product_image: string;
  }
  
  export interface Recipe {
    id: number;
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
