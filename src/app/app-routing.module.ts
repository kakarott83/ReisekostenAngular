import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelsComponent } from './travels/travels.component';
import { TravelDetailComponent } from './travel-detail/travel-detail.component';
import { TravelAddComponent } from './travel-add/travel-add.component';
import { TravelEditComponent } from './travel-edit/travel-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {path: 'travels', component: TravelsComponent},
  {path: 'detail/:id', component: TravelDetailComponent},
  {path: 'edit/:id', component: TravelEditComponent},
  {path: 'add', component: TravelAddComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'customers', component: CustomersComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
