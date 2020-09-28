import {RouterModule, Routes} from '@angular/router';
import {CommunicationsUserHeaderComponent} from './components/communications-create/communications-user-header.component';
import {CommunicationsListComponent} from './components/communications-list/communications-list.component';
import {VideoPopupComponent} from './components/video-popup/video-popup.component';
import {CommunicationRouteUtils} from './utils/communication-route.utils';
import {CommunicationsUsersListComponent} from './components/communications-users-list/communications-users-list.component';
import {CommunicationsSendMessageComponent} from './components/communications-send-message/communications-send-message.component';
import {CommunicationsPageComponent} from './components/communications-page/communications-page.component';
import {CommunicationsUsersInfoComponent} from './components/communications-users-info/communications-users-info.component';
import {NgModule} from '@angular/core';
import {IncomingCallPopupComponent} from './components/incoming-call-popup/incoming-call-popup.component';

export const CommunicationRoutes: Routes = [
  {
    path: '',
    component: CommunicationsPageComponent,
    data: { roles : CommunicationRouteUtils.getListRouteRoles() }
  }
];

@NgModule({
  imports: [RouterModule.forChild(CommunicationRoutes)],
  exports: [RouterModule]
})
export class CommunicationsRoutingModule {
}

export const CommunicationsRoutingComponents = [CommunicationsUserHeaderComponent, CommunicationsPageComponent,
  CommunicationsListComponent, CommunicationsSendMessageComponent, CommunicationsUsersInfoComponent,
  CommunicationsUsersListComponent, CommunicationsUserHeaderComponent, VideoPopupComponent, IncomingCallPopupComponent];

