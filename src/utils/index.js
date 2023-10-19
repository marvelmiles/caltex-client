export const setFutureDate = days => {
  return new Date(new Date().getTime() + days * 86400000);
};

export const getDaysDifference = (startDate, endDate) => {
  const utcStartDate = new Date(startDate);
  const utcEndDate = new Date(endDate);

  return Math.floor((utcEndDate - utcStartDate) / (1000 * 60 * 60 * 24));
};
