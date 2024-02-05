import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';

const routes: Routes = [
  {path:'dashboard', component: AdminDashboardComponent},
  {path:'category',component: AddCategoryComponent},
  {path:':categoryId/product', component: PostProductComponent},
  {path:':categoryId/products', component: ViewProductsComponent},
  {path: 'product/:productId', component: UpdateProductComponent},
  {path:'**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
