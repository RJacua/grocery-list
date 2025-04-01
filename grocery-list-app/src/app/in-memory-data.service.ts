import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = [
      { category_id: 1, category_name: 'Casa e Limpeza'},
      { category_id: 2, category_name: 'Higiene Pessoal' },
      { category_id: 3, category_name: 'Cafe da manhã e Frios' },
      { category_id: 4, category_name: 'Padaria' },
      { category_id: 5, category_name: 'Frutas e Vegetais' },
      { category_id: 6, category_name: 'Açougue' },
      { category_id: 7, category_name: 'Biscoitos e Salgadinhos' },
      { category_id: 8, category_name: 'Peixaria' },
      { category_id: 9, category_name: 'Conservas' },
      { category_id: 10, category_name: 'Grãos, Massas e Importados' },
      { category_id: 11, category_name: 'Oleo e Molhos' },
      { category_id: 12, category_name: 'Bebidas' },
      { category_id: 13, category_name: 'Congelados' },
    ];

    const products = [
      // Casa e Limpeza (1)
    
      // Higiene Pessoal (2)
      { product_id: 1, category_id: 2, product_name: 'Shampoo', amount_unit: ' bottle', product_image: "" },
    
      // Cafe da manhã e Frios (3)
      { product_id: 2, category_id: 3, product_name: 'Achocolatado', amount_unit: ' lata', product_image: "" },
      { product_id: 3, category_id: 3, product_name: 'Café', amount_unit: ' saco', product_image: "" },
      { product_id: 4, category_id: 3, product_name: 'Queijo Grana Padano', amount_unit: ' pacote', product_image: "" },
      { product_id: 5, category_id: 3, product_name: 'Ricota', amount_unit: ' caixa', product_image: "" },
      
      // Padaria (4)
      { product_id: 6, category_id: 4, product_name: 'Torrada', amount_unit: ' pacote', product_image: "" },
    
      // Frutas e Vegetais (5)
      { product_id: 7, category_id: 5, product_name: 'Abrobrinha', amount_unit: ' unidade', product_image: "" },
      { product_id: 8, category_id: 5, product_name: 'Alho', amount_unit: ' saco', product_image: "" },
      { product_id: 9, category_id: 5, product_name: 'Banana', amount_unit: ' unidade', product_image: "" },
      { product_id: 10, category_id: 5, product_name: 'Brocolis', amount_unit: ' unidade', product_image: "" },
      { product_id: 11, category_id: 5, product_name: 'Cebola', amount_unit: ' saco', product_image: "" },
      { product_id: 12, category_id: 5, product_name: 'Cenoura', amount_unit: ' saco', product_image: "" },
      { product_id: 13, category_id: 5, product_name: 'Couve Flor', amount_unit: ' unidade', product_image: "" },
      { product_id: 14, category_id: 5, product_name: 'Espinafre', amount_unit: ' unidade', product_image: "" },
      { product_id: 15, category_id: 5, product_name: 'Limão', amount_unit: ' unidade', product_image: "" },
      { product_id: 16, category_id: 5, product_name: 'Maça', amount_unit: ' saco', product_image: "" },
      { product_id: 17, category_id: 5, product_name: 'Uva', amount_unit: ' caixa', product_image: "" },
    
      // Açougue (6)
      { product_id: 18, category_id: 6, product_name: 'Bifinho de Porco', amount_unit: ' box', product_image: "" },
      { product_id: 19, category_id: 6, product_name: 'Linguiça de Feijão', amount_unit: ' pacote', product_image: "" },
      { product_id: 20, category_id: 6, product_name: 'Peito de Frango', amount_unit: ' box', product_image: "" },
    
      // Biscoitos e Salgadinhos (7)
      { product_id: 21, category_id: 7, product_name: 'Batata Palha', amount_unit: ' pacote', product_image: "" },
    
      // Peixaria (8)
      { product_id: 22, category_id: 8, product_name: 'Espetinho de Peixe', amount_unit: ' box', product_image: "" },
    
      // Conservas (9)
      { product_id: 23, category_id: 9, product_name: 'Cogumelo em Conserva', amount_unit: ' lata', product_image: "" },
    
      // Grãos, Massas e Importados (10)
      { product_id: 24, category_id: 10, product_name: 'Arroz', amount_unit: ' saco', product_image: "" },
      { product_id: 25, category_id: 10, product_name: 'Feijão', amount_unit: ' saco', product_image: "" },
      { product_id: 26, category_id: 10, product_name: 'Macarrão', amount_unit: ' pacote', product_image: "" },
    
      // Oleo e Molhos (11)
    
      // Bebidas (12)
    
      // Congelados (13)
      { product_id: 27, category_id: 13, product_name: 'Cogumelos', amount_unit: ' caixa', product_image: "" },
    ];
    

    const recipes = [
      {
        recipe_id: 1, recipe_name: 'Fruit Salad', items: [
          {product: products[0], quantity: 2},
          {product: products[3], quantity: 5},
        ]
      },
      {
        recipe_id: 2, recipe_name: 'Meat Lover', items: [
          {product: products[2], quantity: 1},
          {product: products[4], quantity: 2},
        ]
      },
    ];

    return { categories, products, recipes };
  }
}
