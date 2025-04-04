import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = [
      { id: 1, category_name: 'Casa e Limpeza' },
      { id: 2, category_name: 'Higiene Pessoal' },
      { id: 3, category_name: 'Cafe da manhã e Frios' },
      { id: 4, category_name: 'Padaria' },
      { id: 5, category_name: 'Frutas e Vegetais' },
      { id: 6, category_name: 'Açougue' },
      { id: 7, category_name: 'Biscoitos e Salgadinhos' },
      { id: 8, category_name: 'Peixaria' },
      { id: 9, category_name: 'Conservas' },
      { id: 10, category_name: 'Grãos, Massas e Importados' },
      { id: 11, category_name: 'Oleo e Molhos' },
      { id: 12, category_name: 'Bebidas' },
      { id: 13, category_name: 'Congelados' },
    ];

    const products = [
      // Casa e Limpeza (1)

      // Higiene Pessoal (2)
      { id: 1, category_id: 2, product_name: 'Shampoo', amount_unit: ' bottle', product_image: "" },

      // Cafe da manhã e Frios (3)
      { id: 2, category_id: 3, product_name: 'Achocolatado', amount_unit: ' lata', product_image: "" },
      { id: 3, category_id: 3, product_name: 'Café', amount_unit: ' saco', product_image: "" },
      { id: 4, category_id: 3, product_name: 'Queijo Grana Padano', amount_unit: ' pacote', product_image: "" },
      { id: 5, category_id: 3, product_name: 'Ricota', amount_unit: ' caixa', product_image: "" },
      { id: 19, category_id: 3, product_name: 'Linguiça de Feijão', amount_unit: ' pacote', product_image: "" },

      // Padaria (4)
      { id: 6, category_id: 4, product_name: 'Torrada', amount_unit: ' pacote', product_image: "" },

      // Frutas e Vegetais (5)
      { id: 7, category_id: 5, product_name: 'Abrobrinha', amount_unit: ' unidade', product_image: "" },
      { id: 8, category_id: 5, product_name: 'Alho', amount_unit: ' saco', product_image: "" },
      { id: 9, category_id: 5, product_name: 'Banana', amount_unit: ' unidade', product_image: "" },
      { id: 10, category_id: 5, product_name: 'Brocolis', amount_unit: ' unidade', product_image: "" },
      { id: 11, category_id: 5, product_name: 'Cebola', amount_unit: ' saco', product_image: "" },
      { id: 12, category_id: 5, product_name: 'Cenoura', amount_unit: ' saco', product_image: "" },
      { id: 13, category_id: 5, product_name: 'Couve Flor', amount_unit: ' unidade', product_image: "" },
      { id: 14, category_id: 5, product_name: 'Espinafre', amount_unit: ' unidade', product_image: "" },
      { id: 15, category_id: 5, product_name: 'Limão', amount_unit: ' unidade', product_image: "" },
      { id: 16, category_id: 5, product_name: 'Maça', amount_unit: ' saco', product_image: "" },
      { id: 17, category_id: 5, product_name: 'Uva', amount_unit: ' caixa', product_image: "" },

      // Açougue (6)
      { id: 18, category_id: 6, product_name: 'Bifinho de Porco', amount_unit: ' box', product_image: "" },
      { id: 20, category_id: 6, product_name: 'Peito de Frango', amount_unit: ' box', product_image: "" },

      // Biscoitos e Salgadinhos (7)
      { id: 21, category_id: 7, product_name: 'Batata Palha', amount_unit: ' pacote', product_image: "" },

      // Peixaria (8)
      { id: 22, category_id: 8, product_name: 'Espetinho de Peixe', amount_unit: ' box', product_image: "" },

      // Conservas (9)
      { id: 23, category_id: 9, product_name: 'Cogumelo em Conserva', amount_unit: ' lata', product_image: "" },

      // Grãos, Massas e Importados (10)
      { id: 24, category_id: 10, product_name: 'Arroz', amount_unit: ' saco', product_image: "" },
      { id: 25, category_id: 10, product_name: 'Feijão', amount_unit: ' saco', product_image: "" },
      { id: 26, category_id: 10, product_name: 'Macarrão', amount_unit: ' pacote', product_image: "" },

      // Oleo e Molhos (11)

      // Bebidas (12)

      // Congelados (13)
      { id: 27, category_id: 13, product_name: 'Cogumelos', amount_unit: ' caixa', product_image: "" },
    ];


    const recipes = [
      {
        id: 1, recipe_name: 'Fruit Salad', items: [
          { product: products[0], quantity: 2 },
          { product: products[3], quantity: 5 },
        ]
      },
      {
        id: 2, recipe_name: 'Meat Lover', items: [
          { product: products[2], quantity: 1 },
          { product: products[4], quantity: 2 },
        ]
      },
    ];

    return { categories, products, recipes };
  }


  get(reqInfo: RequestInfo): Observable<any> {

    // console.log("collection name: ", reqInfo.collectionName);
    let categoryIdParam: string | undefined = undefined;

    if (reqInfo.collectionName === 'products') {
      categoryIdParam = reqInfo.query.get('category_id')?.[0]; // string
    }
    else if (reqInfo.collectionName === 'categories') {
      categoryIdParam = reqInfo.query.get('id')?.[0]; // string
    }

    const collection = reqInfo.collection as any[];

    if (categoryIdParam === undefined || categoryIdParam === "0") {
      return reqInfo.utils.createResponse$(() => ({
        body: collection,
        status: STATUS.OK
      }));
    }

    const categoryId = parseInt(categoryIdParam); // convertido para número

    if (isNaN(categoryId)) {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'invalid id' },
        status: STATUS.BAD_REQUEST
      }));
    }

    if (reqInfo.collectionName === 'products') {
      // console.log("get products with cat id: ", categoryId);
      const filtered = collection.filter(item => item.category_id === categoryId);

      const options: ResponseOptions = {
        body: filtered,
        status: STATUS.OK
      };

      return reqInfo.utils.createResponse$(() => options);
    }

    if (reqInfo.collectionName === 'categories') {
      console.log("get categories with id: ", categoryId);
      const categoryIdParam = reqInfo.query.get('id')?.[0];
      const categoryIdAQUI = Number(categoryIdParam);

      const filtered = collection.filter(item => item.id === categoryIdAQUI);

      return reqInfo.utils.createResponse$(() => ({
        body: filtered,
        status: STATUS.OK
      }));
    }    

    return reqInfo.utils.createResponse$(() => ({
      body: { error: 'not found' },
      status: STATUS.NOT_FOUND
    }));

  }

  post(reqInfo: RequestInfo): Observable<ResponseOptions> | undefined {
    if (!reqInfo.collection) return undefined;

    const collection = reqInfo.collection as any[];
    const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};

    const hasOrder: boolean = typeof body.order === 'number';
    const insertAt: number = hasOrder
      ? Math.max(0, Math.min(body.order, collection.length))
      : collection.length;

    const cleanBody = { ...body };
    delete cleanBody.order;

    const newId = this.genId(collection);
    const newItem = { id: newId, ...cleanBody };

    collection.splice(insertAt, 0, newItem);

    const response: ResponseOptions = {
      body: newItem,
      status: 201,
      headers: reqInfo.headers,
      url: reqInfo.url
    };

    return reqInfo.utils.createResponse$(() => response);
  }

  private genId(collection: any[]): number {
    return collection.length ? Math.max(...collection.map(item => item.id || 0)) + 1 : 1;
  }

}