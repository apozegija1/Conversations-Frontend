import {Role} from '../../users/models/role.enum';

export class CommunicationRouteUtils {
  public static getListRouteRoles(): Role[] {
    return [Role.CompanyAdmin, Role.Agent, Role.User];
  }
}
