export class Constants {
  static Api = {
    Login: 'api/authenticate',
    Register: 'api/register',
    Communications: 'api/communications',
    Companies: 'api/companies',
    Users: 'api/users',
    Roles: 'api/roles',
    CurrentUser: 'api/user',
    Statistics: 'api/statistics'
  };
  static LocalStorageKey = {
    CurrentUser: 'currentUser',
    CurrentAuth: 'currentToken',
    CurrentWebrtc: 'currentWebrtc',
    LanguageSelected: 'selectedLanguage'
  };
  static Defaults = {
    Language: 'en'
  };
  static Menu = {
    defaultTopMenuName: 'topbar'
  };
  static EventName = {
    Established: 'established',
    Hangup: 'hangup',
    IncomingCall: 'incoming-call',
    Ringing: 'ringing',
    Error: 'error'
  };
}
