export const formatToDecimalPlace = (number = 0, toLocale) => {
  number = Number(number) || 0;

  if (number === 0) return "00.00";

  return toLocale ? number.toLocaleString() + ".00" : number.toFixed(2);
};
