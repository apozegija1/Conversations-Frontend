import {Role} from '../models/role.enum';

export class UserRouteUtils {
  public static getListRouteRoles(): Role[] {
    return [Role.CompanyAdmin, Role.Admin];
  }

  public static getCreateRouteRoles(): Role[] {
    return [Role.CompanyAdmin, Role.Admin];
  }
}
