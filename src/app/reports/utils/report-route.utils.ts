import {Role} from '../../users/models/role.enum';

export class ReportRouteUtils {
  public static getReportsRouteRoles(): Role[] {
    return [Role.CompanyAdmin];
  }

}
