export const createUTCDate = (yr, mth, day, hr, mn, s, ms) => {
  const today = new Date();

  return Date.UTC(
    yr || today.getFullYear(),
    mth || today.getMonth(),
    day || today.getDate(),
    hr || today.getHours(),
    mn || today.getMinutes(),
    s || today.getSeconds(),
    ms || today.getMilliseconds()
  );
};
