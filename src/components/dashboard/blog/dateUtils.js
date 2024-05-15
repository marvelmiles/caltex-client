export const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const day = date.getDate(); // Day of the month as a number (1-31)

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()]; // Month as a string

  const year = date.getFullYear(); // Full year as a number

  return `${day} ${month}, ${year}`;
};
