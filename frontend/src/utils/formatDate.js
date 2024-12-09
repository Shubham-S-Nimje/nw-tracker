const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short", // 'Mon'
    month: "short", // 'Dec'
    day: "2-digit", // '06'
    year: "numeric", // '2024'
    hour: "2-digit", // '15'
    minute: "2-digit", // '00'
    second: "2-digit", // '00'
    hour12: true, // Use 12-hour time
  });
};

export default formatDate;
