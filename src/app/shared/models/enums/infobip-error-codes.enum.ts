// Error codes from https://www.infobip.com/docs/essentials/response-status-and-error-codes
export enum InfobipErrorCodes {
  NO_ERROR = 0, // Success hangup from user we called
  EC_VOICE_NO_ANSWER = 5003,
  EC_VOICE_USER_BUSY = 5002,
  EC_VOICE_ERROR_REQUEST_TIMEOUT= 5408
}
