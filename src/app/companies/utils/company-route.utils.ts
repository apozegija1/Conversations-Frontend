import {Role} from '../../users/models/role.enum';

export class CompanyRouteUtils {
  public static getListRouteRoles(): Role[] {
    return [Role.Admin];
  }

  public static getCreateRouteRoles(): Role[] {
    return [Role.Admin];
  }
}
