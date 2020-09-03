export class Constants {
  static Api = {
    Login: 'api/authenticate',
    Register: 'api/register',
    Communications: 'api/communications',
    Companies: 'api/companies',
    Users: 'api/users',
    Roles: 'api/roles',
    CurrentUser: 'api/user',
    Home: 'api/statistics/home'
  };
  static LocalStorageKey = {
    CurrentUser: 'currentUser',
    CurrentAuth: 'currentToken',
    LanguageSelected: 'selectedLanguage'
  };
  static Defaults = {
    Language: 'en'
  };
  static Menu = {
    defaultTopMenuName: 'topbar'
  };
}
