import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}


export const DashboardRoutingComponents = [HomeComponent];

