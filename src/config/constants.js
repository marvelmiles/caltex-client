import { isProdMode } from ".";

export const HTTP_401_MSG = "Authorization credentials is invalid";

export const HTTP_CODE_MAIL_ERROR = "MAIL_ERROR";

export const HTTP_CODE_ACCOUNT_DISABLED = "ACCOUNT_DISABLED";

export const HTTP_CODE_ACCOUNT_VERIFICATION_ERROR =
  "ACCOUNT_VERIFICATION_ERROR";

export const MSG_DEFAULT_ERR = "Something went wrong while fetching!";

export const VERIFIC_TOKEN_TIMER = "VERIFIC_TOKEN_TIMER";

export const HOME_ORIGIN = "https://www.caltextrader.com";

export const CLIENT_ORIGIN = isProdMode
  ? "https://www.app.caltextrader.com"
  : "http://localhost:3000";

export const currencySymbols = {
  USD: "$",
  EUR: "€"
};

export const DATE_FORMAT_TRANS_HIS = "MMM D, YYYY";

export const COOKIE_ACCESS_TOKEN = "_access_token";

export const COOKIE_REFRESH_TOKEN = "_refresh_token";
