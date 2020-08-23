export class Constants {
  static Api = {
    Login: 'api/authenticate',
    Register: 'api/register',
    Communications: 'api/communications',
    Companies: 'api/companies',
    Users: 'api/users',
    CurrentUser: 'api/user'
  };
  static LocalStorageKey = {
    CurrentUser: 'currentUser',
    CurrentAuth: 'currentToken',
    LanguageSelected: 'selectedLanguage'
  };
  static Defaults = {
    Language: 'en'
  };
}
