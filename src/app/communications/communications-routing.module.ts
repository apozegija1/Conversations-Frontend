import { RouterModule, Routes } from '@angular/router';
import {CommunicationsCreateComponent} from './components/communications-create/communications-create.component';
import {CommunicationsListComponent} from './components/communications-list/communications-list.component';
import {VideoPopupComponent} from './components/video-popup/video-popup.component';

export const CommunicationRoutes: Routes = [
  {
    path: '',
    component: CommunicationsListComponent
  }
];

export const CommunicationsRoutingModule = RouterModule.forChild(CommunicationRoutes);

export const CommunicationsRoutingComponents = [CommunicationsListComponent, CommunicationsCreateComponent,
  VideoPopupComponent];

