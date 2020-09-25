import {Role} from '../../users/models/role.enum';

export class ReportRouteUtils {
  public static getCommunicationsRouteRoles(): Role[] {
    return [Role.CompanyAdmin];
  }

}
