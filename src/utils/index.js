import Cookies from "js-cookie";

export const setFutureDate = (days) => {
  return new Date(new Date().getTime() + days * 86400000);
};

export const getDaysDifference = (endDate, startDate = Date.now()) => {
  const utcStartDate = new Date(startDate);
  const utcEndDate = new Date(endDate);

  return Math.floor((utcEndDate - utcStartDate) / (1000 * 60 * 60 * 24));
};

export const deleteCookie = (name) => {
  Cookies.remove(name);
};

export const setCookie = (name, data) => {
  Cookies.set(name, JSON.stringify(data));
};

export const getCookie = (name) => {
  const u = Cookies.get(name);

  return u ? JSON.parse(u) : null;
};

export const getKycStatus = (kyc) => {
  let v = "awaiting";

  for (const key in kyc) {
    const obj = kyc[key];

    if (obj.status !== "awaiting") {
      v = obj.status;
      break;
    }
  }

  return v;
};
