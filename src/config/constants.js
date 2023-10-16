import { isProdMode } from ".";

export const HTTP_401_MSG = "Authorization credentials is invalid";

export const HTTP_CODE_MAIL_ERROR = "MAIL_ERROR";

export const HTTP_CODE_ACCOUNT_VERIFICATION_ERROR =
  "ACCOUNT_VERIFICATION_ERROR";

export const MSG_DEFAULT_ERR = "Something went wrong while fetching!";

export const VERIFIC_TOKEN_TIMER = "VERIFIC_TOKEN_TIMER";

export const CLIENT_ORIGIN = isProdMode ? "http:" : "http://localhost:3000";

export const HOME_ORIGIN = "http://www.caltextrader.com";

export const currencySymbols = {
  USD: "$",
  EUR: "€"
};

export const DATE_FORMAT_TRANS_HIS = "MMM D, YYYY";
