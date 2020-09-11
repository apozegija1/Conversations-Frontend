import { RouterModule, Routes } from '@angular/router';
import {CommunicationsUserHeaderComponent} from './components/communications-create/communications-user-header.component';
import {CommunicationsListComponent} from './components/communications-list/communications-list.component';
import {VideoPopupComponent} from './components/video-popup/video-popup.component';
import {CommunicationRouteUtils} from './utils/communication-route.utils';
import {CommunicationsUsersListComponent} from './components/communications-users-list/communications-users-list.component';
import {CommunicationsSendMessageComponent} from './components/communications-send-message/communications-send-message.component';
import {CommunicationsPageComponent} from './components/communications-page/communications-page.component';
import {CommunicationsUsersInfoComponent} from './components/communications-users-info/communications-users-info.component';

export const CommunicationRoutes: Routes = [
  {
    path: '',
    component: CommunicationsPageComponent,
    data: { roles : CommunicationRouteUtils.getListRouteRoles() }
  }
];

export const CommunicationsRoutingModule = RouterModule.forChild(CommunicationRoutes);

export const CommunicationsRoutingComponents = [CommunicationsUserHeaderComponent, CommunicationsPageComponent,
  CommunicationsListComponent, CommunicationsSendMessageComponent, CommunicationsUsersInfoComponent,
  CommunicationsUsersListComponent, CommunicationsUserHeaderComponent, VideoPopupComponent];

