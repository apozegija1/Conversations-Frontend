import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {RoleTranslationType} from '../models/enums/role-translation-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleTranslationService {
  private titlesCompany = { title1: 'agents', title2: 'calls', title3: 'average_call_duration',
    title4: 'number_of_calls_by_month' };
  private titlesSuperAgent = { title1: 'users_registered', title2: 'companies_registered',
    title3: 'users_registered_in_this_year_by_months', title4: 'number_of_users_registered_by_months'};
  private titlesAgentsAndUsers  = { title1: 'sms', title2: 'calls', title3: 'average_call_duration',
    title4: 'number_of_calls_by_month' };

  private roleTranslations: { [key: string]: any };

  constructor(private authService: AuthenticationService) {
    if (this.authService.isLoggedIn) {
      this.init();
    }

    this.authService.getIsUserLoggedIn()
      .subscribe((data) => {
      this.init();
    });
  }

  private init() {
    if (this.authService.isCompanyAdmin()) {
      this.roleTranslations = {
        [RoleTranslationType.Home]: this.titlesCompany
      };
    } else if (this.authService.isUser()) {
      this.roleTranslations = {
        [RoleTranslationType.Home]: this.titlesAgentsAndUsers
      };
    } else if (this.authService.isAgent()) {
      this.roleTranslations = {
        [RoleTranslationType.Home]: this.titlesAgentsAndUsers
      };
    } else {
      this.roleTranslations = {
        [RoleTranslationType.Home]: this.titlesSuperAgent
      };
    }
  }

  public getTranslation(key: RoleTranslationType) {
    return this.roleTranslations[key];
  }
}
