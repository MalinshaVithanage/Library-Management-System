import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsByCategoryComponent } from './components/view-products-by-category/view-products-by-category.component';
import { PostReservationComponent } from './components/post-reservation/post-reservation.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  {path:'dashboard', component: CustomerDashboardComponent},
  {path:':categoryId/products', component: ViewProductsByCategoryComponent},
  {path:'reservation',component: PostReservationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
