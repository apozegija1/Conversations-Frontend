import { RouterModule, Routes } from '@angular/router';
import {CommunicationsCreateComponent} from './components/communications-create/communications-create.component';
import {CommunicationsListComponent} from './components/communications-list/communications-list.component';

export const CommunicationRoutes: Routes = [
  {
    path: 'list',
    component: CommunicationsListComponent
  },
  {
    path: 'create',
    component: CommunicationsCreateComponent
  }
];

export const CommunicationsRoutingModule = RouterModule.forChild(CommunicationRoutes);

export const CommunicationsRoutingComponents = [CommunicationsListComponent, CommunicationsCreateComponent];

