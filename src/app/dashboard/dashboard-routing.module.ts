import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

export const DashboardRoutingModule = RouterModule.forChild(DashboardRoutes);

export const DashboardRoutingComponents = [HomeComponent];

