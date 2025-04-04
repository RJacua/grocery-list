import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { ListAuthGuard } from './list-auth-route-guard';

export enum ROUTER_TOKENS {
  HOME = 'home',
  PRODUCT = 'product',
  CREATE = 'create',
  LIST = 'list',
  NOT_AUTH = 'not-auth'
}

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: ROUTER_TOKENS.HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
  },
  {
    path: ROUTER_TOKENS.PRODUCT,
    loadComponent: () => import('./product/product.component').then(m => m.ProductComponent)
  },
  {
    path: `${ROUTER_TOKENS.PRODUCT}/:categoryId`,
    loadComponent: () => import('./product/product.component').then(m => m.ProductComponent)
  },
  {
    path: ROUTER_TOKENS.CREATE,
    loadComponent: () => import('./create/form.component').then(m => m.FormComponent)
  },
  {
    path: ROUTER_TOKENS.LIST,
    loadComponent: () => import('./list/list.component').then(m => m.ListComponent)
  },
  // {
  //   path: '**',
  //   redirectTo: ROUTER_TOKENS.HOME
  // }
];
